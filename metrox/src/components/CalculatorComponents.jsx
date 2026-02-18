import clsx from 'clsx';
import { Info } from 'lucide-react';

export function InputGroup({ label, error, unit, ...props }) {
    return (
        <div className="mb-5 relative group">
            <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                {label}
            </label>
            <div className="relative flex items-center">
                <input
                    className={clsx(
                        "w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 pr-10 border-2 rounded-sm text-lg font-mono outline-none transition-all",
                        error
                            ? "border-red-500 focus:border-red-600 bg-red-50 dark:bg-red-900/10"
                            : "border-slate-200 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-500"
                    )}
                    type="number"
                    step="any"
                    autoComplete="off"
                    {...props}
                />
                {unit && (
                    <span className="absolute right-3 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase pointer-events-none">
                        {unit}
                    </span>
                )}
            </div>
            {error && <span className="text-xs text-red-500 mt-1 font-medium flex items-center"><Info size={12} className="mr-1" /> {error.message}</span>}
        </div>
    );
}

export function ResultCard({ title, value, unit = '', formula }) {
    return (
        <div className="bg-slate-900 dark:bg-black p-5 rounded-sm border border-slate-700 dark:border-slate-800 shadow-lg relative overflow-hidden group">
            <div className="relative z-10">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                    {title}
                </p>
                <div className="flex items-baseline">
                    <p className="text-3xl font-mono font-bold text-white tracking-tight">
                        {value}
                    </p>
                    <span className="ml-2 text-sm font-medium text-amber-500">{unit}</span>
                </div>

                {formula && (
                    <div className="mt-3 pt-3 border-t border-slate-800">
                        <p className="text-[10px] text-slate-500 font-mono">
                            {formula}
                        </p>
                    </div>
                )}
            </div>
            {/* Decorative background glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
        </div>
    );
}
