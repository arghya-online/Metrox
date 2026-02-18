import React from 'react';
import { Link } from 'react-router-dom';
import { Ruler, Activity, Settings, Disc, ArrowLeftRight, Cog, ChevronRight, Triangle, Layers, FileText } from 'lucide-react';

const calculators = [
    {
        id: 'unit-converter',
        name: 'Unit Converter',
        desc: 'Length, Mass, Pressure',
        path: '/calculators/unit-converter',
        icon: ArrowLeftRight,
    },
    {
        id: 'error',
        name: 'Error Calculator',
        desc: 'Absolute, Relative, % Error',
        path: '/calculators/error',
        icon: Activity,
    },
    {
        id: 'tolerance',
        name: 'Tolerance Calc',
        desc: 'Limits & ISO Fits (H7/g6)',
        path: '/calculators/tolerance',
        icon: Ruler,
    },
    {
        id: 'least-count',
        name: 'Least Count',
        desc: 'Vernier & Micrometer',
        path: '/calculators/least-count',
        icon: Disc,
    },
    {
        id: 'thread-wire',
        name: 'Thread Wire',
        desc: 'Best Wire Size (P/2)',
        path: '/calculators/thread-wire',
        icon: Settings,
    },
    {
        id: 'gear-tooth',
        name: 'Gear Tooth',
        desc: 'Chordal Thickness',
        path: '/calculators/gear-tooth',
        icon: Cog,
    },
    {
        id: 'sine-bar',
        name: 'Sine Bar',
        desc: 'Angle & Slip Gauge Height',
        path: '/calculators/sine-bar',
        icon: Triangle,
    },
    {
        id: 'slip-gauge',
        name: 'Slip Gauge Builder',
        desc: 'M112 Stack Calculator',
        path: '/calculators/slip-gauge',
        icon: Layers,
    },
    {
        id: 'lab-table',
        name: 'Observation Gen',
        desc: 'Auto-create Lab Tables (PDF)',
        path: '/calculators/lab-table',
        icon: FileText,
    }
];

export default function Calculators() {
    return (
        <div className="p-4 pt-6 pb-24 max-w-2xl mx-auto">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Metrology Tools</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 tracking-wider">PRECISION CALCULATOR SUITE</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {calculators.map((calc) => (
                    <Link
                        key={calc.id}
                        to={calc.path}
                        className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-sm shadow-sm hover:border-amber-500 dark:hover:border-amber-500 transition-all relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start z-10 relative">
                            <div className="flex items-center">
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-sm mr-4 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20 transition-colors">
                                    <calc.icon size={20} className="text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">{calc.name}</h3>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-0.5">{calc.desc}</p>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-amber-500 transition-colors" />
                        </div>
                        {/* Subtle background tech lines */}
                        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-slate-50 dark:from-slate-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
