import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Ruler, ArrowRight } from 'lucide-react';
import { getIsoFit } from '../../data/isoFits';
import clsx from 'clsx';

export default function ISOFits() {
    const [diameter, setDiameter] = useState('');
    const [holeClass, setHoleClass] = useState('H7');
    const [shaftClass, setShaftClass] = useState('g6');

    const result = useMemo(() => {
        if (!diameter) return null;
        return getIsoFit(diameter, holeClass, shaftClass);
    }, [diameter, holeClass, shaftClass]);

    const formatLimit = (val) => {
        if (val === undefined || val === null) return '-';
        return (val / 1000).toFixed(3); // Convert microns to mm
    };

    const getLimitColor = (type) => {
        if (type === 'Clearance') return 'text-emerald-500';
        if (type === 'Interference') return 'text-red-500';
        return 'text-amber-500'; // Transition
    };

    return (
        <div className="p-4 pt-6 pb-24 max-w-2xl mx-auto">
            <header className="mb-6">
                <Link to="/reference" className="text-slate-500 hover:text-amber-500 transition-colors flex items-center mb-2">
                    <ArrowLeft size={16} className="mr-1" /> Back
                </Link>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">ISO 286 Fits</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 tracking-wider">LIMITS & FITS CALCULATOR</p>
            </header>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 shadow-sm mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Nominal Size (mm)</label>
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="e.g. 20"
                                className="w-full bg-slate-50 dark:bg-black text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 p-2 rounded-sm outline-none focus:border-amber-500 transition-colors font-mono font-bold"
                                value={diameter}
                                onChange={(e) => setDiameter(e.target.value)}
                            />
                            <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">mm</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Hole Class</label>
                        <select
                            value={holeClass}
                            onChange={(e) => setHoleClass(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-black text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 p-2 rounded-sm outline-none focus:border-amber-500 transition-colors font-mono"
                        >
                            <option value="H7">H7</option>
                            <option value="H8">H8 (Coming Soon)</option>
                            <option value="G7">G7 (Coming Soon)</option>
                            <option value="P7">P7 (Coming Soon)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Shaft Class</label>
                        <select
                            value={shaftClass}
                            onChange={(e) => setShaftClass(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-black text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 p-2 rounded-sm outline-none focus:border-amber-500 transition-colors font-mono"
                        >
                            <option value="g6">g6</option>
                            <option value="h6">h6</option>
                            <option value="f7">f7 (Coming Soon)</option>
                            <option value="p6">p6 (Coming Soon)</option>
                        </select>
                    </div>
                </div>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in-up">
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 rounded-sm">
                        <span className="text-xs font-bold text-slate-500 uppercase">Fit System</span>
                        <span className={clsx("font-bold text-sm", getLimitColor(result.fitType))}>
                            {result.fitType || 'Standard Fit'}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Hole Card */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-4 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-slate-300 dark:bg-slate-700"></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center">
                                {diameter} {result.hole.class}
                            </h3>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Hole Limits</p>

                            <div className="space-y-2">
                                <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-1">
                                    <span className="text-xs text-slate-400">Max Size</span>
                                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                                        {(parseFloat(diameter) + result.hole.upper / 1000).toFixed(3)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-1">
                                    <span className="text-xs text-slate-400">Min Size</span>
                                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                                        {(parseFloat(diameter) + result.hole.lower / 1000).toFixed(3)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline pt-1">
                                    <span className="text-xs text-slate-400">Tolerance</span>
                                    <span className="font-mono font-bold text-amber-600">
                                        {((result.hole.upper - result.hole.lower) / 1000).toFixed(3)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Shaft Card */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-4 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 dark:bg-slate-500"></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center">
                                {diameter} {result.shaft.class}
                            </h3>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Shaft Limits</p>

                            <div className="space-y-2">
                                <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-1">
                                    <span className="text-xs text-slate-400">Max Size</span>
                                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                                        {(parseFloat(diameter) + result.shaft.upper / 1000).toFixed(3)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-1">
                                    <span className="text-xs text-slate-400">Min Size</span>
                                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                                        {(parseFloat(diameter) + result.shaft.lower / 1000).toFixed(3)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline pt-1">
                                    <span className="text-xs text-slate-400">Tolerance</span>
                                    <span className="font-mono font-bold text-amber-600">
                                        {((result.shaft.upper - result.shaft.lower) / 1000).toFixed(3)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visualization (Simple Bar) */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 flex flex-col items-center justify-center relative overflow-hidden h-32">
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <Ruler size={100} />
                        </div>
                        <div className="relative w-full max-w-xs h-8 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center">
                            {/* Simplified visual representation logic would go here */}
                            <span className="w-full text-center text-[10px] font-bold text-slate-400 uppercase">Fit Visualization Area</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
