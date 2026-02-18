import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SurfaceMetrology() {
    return (
        <div className="max-w-2xl mx-auto p-4 pt-6 pb-24 space-y-6">
            <div className="flex items-center mb-4">
                <Link to="/theory" className="mr-3 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Surface Metrology</h1>
            </div>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">5.1 Why it matters?</h2>
                <ul className="list-disc pl-4 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    <li>Reduces friction/wear.</li>
                    <li>Improves fatigue resistance.</li>
                    <li>Functionality (e.g. sealing).</li>
                </ul>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">5.2 Terminology</h2>
                <dl className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                        <dt className="font-bold text-slate-900 dark:text-white text-sm">Roughness</dt>
                        <dd className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            Micro-irregularities (Primary Texture) from tool marks.
                        </dd>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                        <dt className="font-bold text-slate-900 dark:text-white text-sm">Waviness</dt>
                        <dd className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            Macro-irregularities (Secondary) from vibration.
                        </dd>
                    </div>
                </dl>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">5.3 Evaluation</h2>
                <div className="space-y-3">
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Center Line Average (Ra)</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Arithmetic mean of deviations.</p>
                        <code className="block bg-white dark:bg-slate-900 p-1.5 mt-2 border border-slate-200 dark:border-slate-600 rounded-sm font-mono text-[10px] w-fit">Ra = (1/L) * ∫|y(x)|dx</code>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">RMS Value (Rq)</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Square root of mean squares. Critical for fatigue.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
