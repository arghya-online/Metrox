import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Introduction() {
    return (
        <div className="max-w-2xl mx-auto p-4 pt-6 pb-24 space-y-6">
            <div className="flex items-center mb-4">
                <Link to="/theory" className="mr-3 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Introduction</h1>
            </div>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">1.1 Definition</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                    <strong>Metrology</strong> is the scientific study of measurement. In engineering, it ensures components are manufactured to required accuracy and represent interchangeable parts.
                </p>
                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800 border-l-2 border-amber-500 rounded-r-sm">
                    <p className="text-slate-600 dark:text-slate-400 text-xs italic">
                        "The science of measurement, embracing both experimental and theoretical determinations at any level of uncertainty."
                    </p>
                </div>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">1.2 Objectives</h2>
                <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1 text-sm marker:text-slate-400">
                    <li>Standardize measuring methods.</li>
                    <li>Maintain accuracy standards (traceability).</li>
                    <li>Ensure interchangeable manufacture.</li>
                    <li>Minimize inspection cost and rejection.</li>
                </ul>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-3">1.3 Types of Metrology</h2>
                <div className="space-y-3">
                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Scientific</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Establishment of units and quantity systems. Highest accuracy.</p>
                    </div>
                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Industrial</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Application to manufacturing. Focus on suitability and cost.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Legal</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Regulatory requirements for fair trade and safety.</p>
                    </div>
                </div>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-3">1.4 Key Terms</h2>
                <dl className="space-y-3 text-sm">
                    <div>
                        <dt className="font-bold text-slate-900 dark:text-white">Accuracy vs Precision</dt>
                        <dd className="text-slate-700 dark:text-slate-300 mt-1 text-xs">
                            <span className="text-amber-600 font-semibold">Accuracy:</span> Closeness to true value.<br />
                            <span className="text-amber-600 font-semibold">Precision:</span> Repeatability of measurements.
                        </dd>
                    </div>
                    <div>
                        <dt className="font-bold text-slate-900 dark:text-white">Sensitivity</dt>
                        <dd className="text-slate-700 dark:text-slate-300 mt-1 text-xs">
                            Ratio of change in output to change in input.
                        </dd>
                    </div>
                </dl>
            </section>
        </div>
    );
}
