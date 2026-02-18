import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Ruler, Calculator, BookOpen, ArrowRight, Table } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 pb-24">
            {/* Technical Header */}
            <header className="px-6 pt-6 pb-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight uppercase">METRO<span className="text-amber-600">X</span></h1>
                <p className="text-slate-500 dark:text-slate-400 text-xs tracking-wider uppercase">Precision Metrology Suite v1.0</p>
            </header>

            <div className="p-4 space-y-6 max-w-2xl mx-auto">

                {/* Quick Tools Grid */}
                <section>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Tools</h2>
                        <Link to="/calculators" className="text-xs font-bold text-amber-600 hover:text-amber-700 uppercase flex items-center">
                            All Tools <ArrowRight size={12} className="ml-1" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <ToolCard
                            to="/calculators/unit-converter"
                            icon={Calculator}
                            title="Unit Converter"
                            desc="Length, Mass, Pressure"
                        />
                        <ToolCard
                            to="/calculators/tolerance"
                            icon={Ruler}
                            title="Tolerance Calc"
                            desc="Limits & ISO Fits"
                        />
                        <ToolCard
                            to="/calculators/least-count"
                            icon={Activity}
                            title="Least Count"
                            desc="Vernier & Micrometer"
                        />
                        <ToolCard
                            to="/calculators/gear-tooth"
                            icon={Table}
                            title="Gear Tooth"
                            desc="Chordal Thickness"
                        />
                    </div>
                </section>

                {/* Quick Reference / Instruments Widget */}
                <section className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 rounded-sm shadow-sm p-0 overflow-hidden group hover:border-amber-500/50 transition-all">
                    <Link to="/reference/instruments" className="block">
                        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase flex items-center">
                                <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                                Know Your Instruments
                            </span>
                            <BookOpen size={14} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                        </div>
                        <div className="p-4">
                            <div className="flex gap-4 items-center">
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                        <span className="text-xs font-mono text-slate-600 dark:text-slate-400">Vernier Caliper</span>
                                        <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1 rounded text-slate-600 dark:text-slate-300">0.02mm</span>
                                    </div>
                                    <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                        <span className="text-xs font-mono text-slate-600 dark:text-slate-400">Micrometer</span>
                                        <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1 rounded text-slate-600 dark:text-slate-300">0.01mm</span>
                                    </div>
                                    <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                        <span className="text-xs font-mono text-slate-600 dark:text-slate-400">Sine Bar</span>
                                        <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1 rounded text-slate-600 dark:text-slate-300">Angle</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 text-center">
                                <span className="text-amber-600 text-[10px] uppercase font-bold tracking-wide flex items-center justify-center">
                                    View All Specs, Viva & Errors <ArrowRight size={12} className="ml-1" />
                                </span>
                            </div>
                        </div>
                    </Link>
                </section>

                {/* Recent Theory Module */}
                <section>
                    <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Core Theory</h2>
                    <Link to="/theory/linear" className="block bg-slate-800 text-white p-4 rounded-sm shadow-md hover:bg-slate-700 transition-colors border-l-4 border-amber-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-sm mb-1">Linear Measurements</h3>
                                <p className="text-xs text-slate-300">Detailed study of Vanier Calipers, Micrometers, and Slip Gauges.</p>
                            </div>
                            <BookOpen size={16} className="text-amber-500" />
                        </div>
                    </Link>
                </section>

            </div>
        </div>
    );
}

function ToolCard({ to, icon: Icon, title, desc }) {
    return (
        <Link to={to} className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 p-4 rounded-sm hover:border-amber-500/50 hover:shadow-sm transition-all group">
            <div className="flex items-center mb-2">
                <Icon size={18} className="text-slate-400 group-hover:text-amber-600 transition-colors" />
                <span className="ml-2 font-bold text-slate-700 dark:text-slate-200 text-sm">{title}</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{desc}</p>
        </Link>
    );
}
