import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { gdtSymbols } from '../../data/gdtSymbols';

export default function GDTReference() {
    return (
        <div className="p-4 pt-6 pb-24 max-w-2xl mx-auto">
            <header className="mb-6">
                <Link to="/reference" className="text-slate-500 hover:text-amber-500 transition-colors flex items-center mb-2">
                    <ArrowLeft size={16} className="mr-1" /> Back
                </Link>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">GD&T Symbols</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 tracking-wider">GEOMETRIC DIMENSIONING & TOLERANCING</p>
            </header>

            <div className="space-y-8 animate-fade-in-up">
                {gdtSymbols.map((category, idx) => (
                    <section key={idx}>
                        <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">
                            {category.category}
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                            {category.items.map((item, i) => (
                                <div key={i} className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-sm shadow-sm">
                                    <div className="w-12 h-12 flex-shrink-0 bg-slate-100 dark:bg-slate-800 rounded-sm flex items-center justify-center text-2xl font-bold text-slate-900 dark:text-white mr-4 font-mono">
                                        {item.symbol}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{item.name}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
