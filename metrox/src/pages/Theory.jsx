import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Hash } from 'lucide-react';

const modules = [
    {
        id: 'introduction',
        title: 'Introduction to Metrology',
        description: 'Definition, Objectives, Types of Metrology, and Errors.',
        link: '/theory/introduction'
    },
    {
        id: 'linear',
        title: 'Linear Measurements',
        description: 'Standards, Vernier Calipers, Micrometers, Slip Gauges.',
        link: '/theory/linear'
    },
    {
        id: 'angular',
        title: 'Angular Measurements',
        description: 'Sine Bar, Bevel Protractor, Clinometers, Angle Dekkors.',
        link: '/theory/angular'
    },
    {
        id: 'limits',
        title: 'Limits, Fits & Tolerances',
        description: 'Interchangeability, Cleanance/Interference Fits, Gauge Design.',
        link: '/theory/limits-fits'
    },
    {
        id: 'surface',
        title: 'Surface Metrology',
        description: 'Surface Texture, Roughness (Ra/Rz), Measurement methods.',
        link: '/theory/surface'
    },
    {
        id: 'interferometry',
        title: 'Interferometry',
        description: 'Interference principles, Optical Flats, Laser Interferometry.',
        link: '/theory/interferometry'
    }
];

export default function Theory() {
    return (
        <div className="p-4 pt-6 pb-24 max-w-2xl mx-auto">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Theory Modules</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 tracking-wider">ENGINEERING SYLLABUS</p>
            </header>

            <div className="space-y-3">
                {modules.map((module, index) => (
                    <Link
                        key={module.id}
                        to={module.link}
                        className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-4 hover:border-amber-500/50 transition-all group active:scale-[0.99]"
                    >
                        <div className="flex-shrink-0 mr-4 w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-sm text-slate-500 dark:text-slate-400 font-mono text-sm font-bold group-hover:text-amber-600 transition-colors">
                            {index + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-amber-600 transition-colors">
                                {module.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-500 truncate mt-0.5">
                                {module.description}
                            </p>
                        </div>

                        <ChevronRight size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-amber-500 transition-colors ml-2" />
                    </Link>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-600">
                    End of Course List
                </p>
            </div>
        </div>
    );
}
