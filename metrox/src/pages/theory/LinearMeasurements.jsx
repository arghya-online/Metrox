import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LinearMeasurements() {
    return (
        <div className="max-w-2xl mx-auto p-4 pt-6 pb-24 space-y-6">
            <div className="flex items-center mb-4">
                <Link to="/theory" className="mr-3 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Linear Measurements</h1>
            </div>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">2.1 Standards</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Line Standard</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Distance between two lines.</p>
                        <ul className="list-disc pl-4 text-xs text-slate-500 dark:text-slate-500">
                            <li>Yard, Meter, Rule.</li>
                            <li>Subject to parallax.</li>
                        </ul>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">End Standard</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Distance between two surfaces.</p>
                        <ul className="list-disc pl-4 text-xs text-slate-500 dark:text-slate-500">
                            <li>Slip Gauges that are highly accurate.</li>
                            <li>Subject to wear.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">2.2 Vernier Caliper</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-3">
                    Precision instrument for internal, external, and depth measurements using a main scale and sliding vernier scale.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border-l-2 border-amber-500 mb-3">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Least Count (LC) Formula</h4>
                    <code className="text-amber-600 font-mono text-xs block mb-1">LC = 1 MSD - 1 VSD</code>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] italic">
                        Ex: 1 MSD - (49/50) MSD = 0.02mm
                    </p>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-white">Errors:</strong> Zero Error (jaws closed mismatch) & Parallax Error.
                </div>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">2.3 Micrometer</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-3">
                    Based on screw and nut principle. Higher precision than Vernier.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border-l-2 border-amber-500">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Least Count (LC) Formula</h4>
                    <code className="text-amber-600 font-mono text-xs block mb-1">LC = Pitch / Circular Divisions</code>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] italic">
                        Ex: 0.5mm / 50 = 0.01mm
                    </p>
                </div>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">2.4 Slip Gauges</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-3">
                    Precision blocks for reference standards. Used with <strong>Wringing</strong> (molecular adhesion).
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 border border-slate-100 dark:border-slate-800 rounded-sm">
                        <span className="font-bold text-slate-900 dark:text-white">Grade 00</span>
                        <span className="block text-slate-500">Calibration (Ref)</span>
                    </div>
                    <div className="p-2 border border-slate-100 dark:border-slate-800 rounded-sm">
                        <span className="font-bold text-slate-900 dark:text-white">Grade 0</span>
                        <span className="block text-slate-500">Inspection</span>
                    </div>
                    <div className="p-2 border border-slate-100 dark:border-slate-800 rounded-sm">
                        <span className="font-bold text-slate-900 dark:text-white">Grade 1</span>
                        <span className="block text-slate-500">Workshop (Tool Room)</span>
                    </div>
                    <div className="p-2 border border-slate-100 dark:border-slate-800 rounded-sm">
                        <span className="font-bold text-slate-900 dark:text-white">Grade 2</span>
                        <span className="block text-slate-500">General Workshop</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
