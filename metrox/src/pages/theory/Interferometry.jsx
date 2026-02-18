import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Interferometry() {
    return (
        <div className="max-w-2xl mx-auto p-4 pt-6 pb-24 space-y-6">
            <div className="flex items-center mb-4">
                <Link to="/theory" className="mr-3 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Interferometry</h1>
            </div>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">6.1 Principle</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-3">
                    Interference of light waves produces bright and dark fringes.
                </p>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border-l-2 border-amber-500">
                    <ul className="list-disc pl-4 text-xs text-slate-700 dark:text-slate-300">
                        <li><strong>Constructive (Bright):</strong> Path diff = nλ</li>
                        <li><strong>Destructive (Dark):</strong> Path diff = (2n + 1)λ / 2</li>
                    </ul>
                </div>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">6.2 Optical Flats</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-3">
                    Glass/Quartz blocks with parallel flat surfaces. Used to check flatness.
                </p>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Fringe Interpretation</h3>
                    <ul className="list-disc pl-4 text-xs text-slate-600 dark:text-slate-400">
                        <li><strong>Parallel:</strong> Flat.</li>
                        <li><strong>Curved:</strong> Convex/Concave.</li>
                        <li><strong>Irregular:</strong> Uneven.</li>
                    </ul>
                </div>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">6.3 NPL Interferometer</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-3">
                    Uses mercury vapor lamp to check flatness of slip gauges.
                </p>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">6.4 Laser Interferometer</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-2">
                    Uses He-Ne laser for high precision/long range.
                </p>
                <ul className="list-disc pl-4 text-xs text-slate-600 dark:text-slate-400">
                    <li>High coherence.</li>
                    <li>CNC calibration.</li>
                    <li>Nanometer accuracy.</li>
                </ul>
            </section>
        </div>
    );
}
