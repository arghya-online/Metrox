import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { metrologyInstruments } from '../../data/instruments';

export default function Instruments() {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="max-w-2xl mx-auto p-4 pt-6 pb-24 space-y-6">
            <div className="flex items-center mb-4">
                <Link to="/reference" className="mr-3 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Metrology Instruments</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Detailed specs & viva prep</p>
                </div>
            </div>

            <div className="space-y-4">
                {metrologyInstruments.map((inst) => (
                    <div key={inst.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm shadow-sm overflow-hidden transition-all duration-300">
                        {/* Header (Always Visible) */}
                        <div
                            className="p-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex justify-between items-start"
                            onClick={() => toggle(inst.id)}
                        >
                            <div className="flex gap-4">
                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-sm overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                                    <img
                                        src={inst.imageLinks[0]}
                                        alt={inst.name}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{inst.category}</span>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1">{inst.name}</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{inst.principle}</p>
                                </div>
                            </div>
                            <button className="text-slate-400 mt-1">
                                {openId === inst.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                        </div>

                        {/* Expanded Content */}
                        {openId === inst.id && (
                            <div className="px-5 pb-5 pt-0 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 animate-fade-in">

                                {/* Quick Specs Grid */}
                                <div className="grid grid-cols-2 gap-3 mt-4 mb-6">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-sm border border-slate-100 dark:border-slate-700">
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Least Count</div>
                                        <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
                                            {Object.values(inst.leastCount)[0]}
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-sm border border-slate-100 dark:border-slate-700">
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Range</div>
                                        <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
                                            {inst.range[0]}
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Sections */}
                                <div className="space-y-4 text-sm">

                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white flex items-center mb-2">
                                            <Info size={14} className="mr-2 text-amber-500" /> Working Principle
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed pl-6">
                                            {inst.principle}
                                        </p>
                                        <code className="block mt-2 ml-6 text-xs font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 w-fit">
                                            {inst.formula}
                                        </code>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white flex items-center mb-2">
                                                <CheckCircle size={14} className="mr-2 text-green-500" /> What it measures
                                            </h3>
                                            <ul className="list-disc pl-10 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                                                {inst.measures.map((m, i) => <li key={i}>{m}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white flex items-center mb-2">
                                                <AlertTriangle size={14} className="mr-2 text-red-400" /> Common Errors
                                            </h3>
                                            <ul className="list-disc pl-10 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                                                {inst.commonErrors.map((e, i) => <li key={i}>{e}</li>)}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Viva Points Accordion-ish */}
                                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                        <h3 className="font-bold text-slate-900 dark:text-white flex items-center mb-3">
                                            <BookOpen size={14} className="mr-2 text-purple-500" /> Viva / Interview Questions
                                        </h3>
                                        <ul className="space-y-2 pl-6">
                                            {inst.vivaPoints.map((q, i) => (
                                                <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start">
                                                    <span className="mr-2 opacity-50">•</span> {q}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
