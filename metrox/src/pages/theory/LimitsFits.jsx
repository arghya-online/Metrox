import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ranges, itGrades } from '../../data/isoFits';

export default function LimitsFits() {
    return (
        <div className="max-w-2xl mx-auto p-4 pt-6 pb-24 space-y-6">
            <div className="flex items-center mb-4">
                <Link to="/theory" className="mr-3 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Limits, Fits & Tolerances</h1>
            </div>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">4.1 Key Definitions</h2>
                <dl className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                        <dt className="font-bold text-slate-900 dark:text-white text-sm">Basic Size</dt>
                        <dd className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            Theoretical size from which limits are derived.
                        </dd>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                        <dt className="font-bold text-slate-900 dark:text-white text-sm">Tolerance</dt>
                        <dd className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            Diff between Upper & Lower limits.
                            <code className="block bg-white dark:bg-slate-900 p-1 mt-1 rounded border border-slate-200 dark:border-slate-600 text-[10px] w-fit">T = UL - LL</code>
                        </dd>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                        <dt className="font-bold text-slate-900 dark:text-white text-sm">Deviation</dt>
                        <dd className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            Algebraic difference between size and basic size.
                        </dd>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                        <dt className="font-bold text-slate-900 dark:text-white text-sm">Fundamental Deviation</dt>
                        <dd className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            Deviation defining position of tolerance zone (closest to zero line).
                        </dd>
                    </div>
                </dl>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">4.2 Types of Fits</h2>
                <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4 py-1">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Clearance Fit</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Hole {'>'} Shaft. Always a gap.</p>
                        <p className="text-[10px] text-slate-500 italic mt-0.5">Ex: Shaft in bearing.</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4 py-1">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Transition Fit</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Overlap. Can be clearance or interference.</p>
                        <p className="text-[10px] text-slate-500 italic mt-0.5">Ex: Spigot/Socket.</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4 py-1">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Interference Fit</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Shaft {'>'} Hole. Force required.</p>
                        <p className="text-[10px] text-slate-500 italic mt-0.5">Ex: Bush in housing.</p>
                    </div>
                </div>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">4.3 Basis of Fits</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Hole Basis</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            Hole size constant. Shaft varies. <br />
                            <span className="font-semibold text-amber-600">Preferred System.</span>
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Shaft Basis</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            Shaft size constant. Hole varies.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">4.4 Taylor's Principle</h2>
                <ul className="list-disc pl-4 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                    <li><strong className="text-slate-900 dark:text-white">GO Gauge:</strong> Checks Max Metal Condition (MMC). Must encompass full form.</li>
                    <li><strong className="text-slate-900 dark:text-white">NO-GO Gauge:</strong> Checks Min Metal Condition (LMC). Checks size only (point contact).</li>
                </ul>
            </section>
            <section className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-4">4.5 Standard Tolerance Grades (IT)</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[300px]">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <th className="p-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Range (mm)</th>
                                <th className="p-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">IT6 (µm)</th>
                                <th className="p-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">IT7 (µm)</th>
                                <th className="p-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">IT8 (µm)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {ranges.map((range, i) => {
                                const prevRange = i === 0 ? 0 : ranges[i - 1];
                                return (
                                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="p-2 text-xs font-mono text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                                            {prevRange} - {range}
                                        </td>
                                        <td className="p-2 text-xs font-mono text-center text-slate-600 dark:text-slate-400">
                                            {itGrades['6'][i]}
                                        </td>
                                        <td className="p-2 text-xs font-mono text-center text-amber-600 font-bold bg-amber-50/50 dark:bg-amber-900/10">
                                            {itGrades['7'][i]}
                                        </td>
                                        <td className="p-2 text-xs font-mono text-center text-slate-600 dark:text-slate-400">
                                            {itGrades['8'][i]}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 italic">* Values in microns (µm). IT7 is commonly used for precision shafts/holes.</p>
            </section>
        </div>
    );
}
