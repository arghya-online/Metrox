import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AngularMeasurements() {
    return (
        <div className="max-w-2xl mx-auto p-4 pt-6 pb-24 space-y-6">
            <div className="flex items-center mb-4">
                <Link to="/theory" className="mr-3 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Angular Measurements</h1>
            </div>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">3.1 Sine Bar</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-3">
                    Precision instrument used with slip gauges. Works on trigonometry (Sine rule).
                </p>

                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border-l-2 border-amber-500 mb-3">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Key Formula</h4>
                    <code className="text-amber-600 font-mono text-xs block mb-1">sin(θ) = h / L</code>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] italic">
                        h = slip gauge height, L = roller distance
                    </p>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Limitations</h3>
                <ul className="list-disc pl-4 text-xs text-slate-600 dark:text-slate-400">
                    <li>Not recommended for angles {'>'} 45°.</li>
                    <li>Hard to handle for heavy parts.</li>
                </ul>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">3.2 Bevel Protractor</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-3">
                    Vernier Bevel Protractor can measure to an accuracy of <strong>5 minutes (5')</strong>.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs mb-1">How to Read</h3>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400">
                        Total Angle = Main Scale (Degrees) + Vernier Coincedence (Minutes).
                    </p>
                </div>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">3.3 Instruments</h2>
                <div className="space-y-3">
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Clinometer</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Measures slope/tilt wrt gravity. Used for flatness checks.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Angle Dekkor</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Autocollimator type. Uses light reflection to detect small angular deviations.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
