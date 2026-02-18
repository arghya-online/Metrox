import { Link } from 'react-router-dom';
import { BookOpen, BoxSelect, Ruler } from 'lucide-react';

export default function Reference() {
    return (
        <div className="p-4 pt-6 pb-24 max-w-2xl mx-auto space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Standard Reference</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 tracking-wider">ENGINEERING DATA LIBRARY</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/reference/gdt" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-sm shadow-sm hover:border-amber-500 dark:hover:border-amber-500 transition-all relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-sm flex items-center justify-center mb-4 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20 transition-colors">
                            <BoxSelect className="text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-500" />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">GD&T Symbols</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Comprehensive guide to Geometric Dimensioning and Tolerancing symbols and modifiers.</p>
                    </div>
                </Link>

                <Link to="/reference/iso-fits" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-sm shadow-sm hover:border-amber-500 dark:hover:border-amber-500 transition-all relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-sm flex items-center justify-center mb-4 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20 transition-colors">
                            <Ruler className="text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-500" />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">ISO 286 Fits</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Interactive lookup for hole and shaft limits (e.g., H7/g6) for standard sizes.</p>
                    </div>
                </Link>

                <Link to="/reference/instruments" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-sm shadow-sm hover:border-amber-500 dark:hover:border-amber-500 transition-all relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-sm flex items-center justify-center mb-4 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20 transition-colors">
                            <Ruler className="text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-500" />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">Metrology Instruments</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Detailed specs, errors, and viva questions for standard gauges (Vernier, Micrometer, etc.).</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
