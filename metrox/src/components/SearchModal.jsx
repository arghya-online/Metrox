import React, { useState, useEffect } from 'react';
import { Search, X, ChevronRight, Ruler, BookOpen, Calculator, Hash, Triangle, Activity, Layers, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const searchIndex = [
    // Calculators
    { title: "Unit Converter", path: "/calculators/unit-converter", type: "Tool", tags: "length mass pressure" },
    { title: "Tolerance Calculator", path: "/calculators/tolerance", type: "Tool", tags: "limits fits iso h7 g6" },
    { title: "Least Count", path: "/calculators/least-count", type: "Tool", tags: "vernier micrometer caliper" },
    { title: "Thread Wire", path: "/calculators/thread-wire", type: "Tool", tags: "screw best wire p/2" },
    { title: "Gear Tooth", path: "/calculators/gear-tooth", type: "Tool", tags: "chordal thickness module" },
    { title: "Sine Bar", path: "/calculators/sine-bar", type: "Tool", tags: "angle slip gauge height" },
    { title: "Slip Gauge Builder", path: "/calculators/slip-gauge", type: "Tool", tags: "stack m112 wringing height" },
    { title: "Observation Table Gen", path: "/calculators/lab-table", type: "Tool", tags: "pdf export msr vsc report" },

    // Analysis
    { title: "Data Analysis", path: "/analysis", type: "Page", tags: "spc cp cpk histogram run chart" },

    // Reference
    { title: "GD&T Symbols", path: "/reference/gdt", type: "Ref", tags: "geometric dimensioning tolerancing" },
    { title: "ISO Fits", path: "/reference/iso-fits", type: "Ref", tags: "hole shaft limits table" },
    { title: "Metrology Instruments", path: "/reference/instruments", type: "Ref", tags: "vernier micrometer gauge dial" },
    { title: "Vernier Caliper Info", path: "/reference/instruments", type: "Detail", tags: "least count error jaw" },
    { title: "Micrometer Info", path: "/reference/instruments", type: "Detail", tags: "screw gauge pitch ratchet" },

    // Theory
    { title: "Introduction", path: "/theory/introduction", type: "Theory", tags: "metrology basics accuracy precision" },
    { title: "Linear Measurements", path: "/theory/linear", type: "Theory", tags: "micro vernier slip gauge" },
    { title: "Angular Measurements", path: "/theory/angular", type: "Theory", tags: "sine bar bevel protractor clinometer" },
    { title: "Limits & Fits", path: "/theory/limits-fits", type: "Theory", tags: "tolerance allowance interference clearance" },
    { title: "Surface Metrology", path: "/theory/surface", type: "Theory", tags: "roughness ra waviness" },
    { title: "Interferometry", path: "/theory/interferometry", type: "Theory", tags: "light optical flats laser" },
];

export default function SearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            setQuery(''); // Reset on open
            setResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = searchIndex.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.tags.includes(lowerQuery)
        );
        setResults(filtered);
    }, [query]);

    const handleSelect = (path) => {
        navigate(path);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fade-in">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-scale-in">

                {/* Search Input */}
                <div className="relative border-b border-slate-100 dark:border-slate-800">
                    <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search tools, topics..."
                        className="w-full pl-12 pr-12 py-3 bg-transparent text-slate-900 dark:text-white outline-none text-base font-medium placeholder:text-slate-400"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button onClick={onClose} className="absolute right-3 top-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Results List */}
                <div className="max-h-[60vh] overflow-y-auto">
                    {query && results.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                            No results found for "{query}"
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50 dark:divide-slate-800">
                            {results.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(item.path)}
                                    className="w-full flex items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left group"
                                >
                                    <div className={`
                                        w-8 h-8 rounded-sm flex items-center justify-center mr-3
                                        ${item.type === 'Tool' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''}
                                        ${item.type === 'Theory' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : ''}
                                        ${item.type === 'Ref' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : ''}
                                        ${item.type === 'Page' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' : ''}
                                    `}>
                                        {item.type === 'Tool' && <Calculator size={16} />}
                                        {item.type === 'Theory' && <BookOpen size={16} />}
                                        {item.type === 'Ref' && <Hash size={16} />}
                                        {item.type === 'Page' && <Activity size={16} />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                                            {item.title}
                                        </h4>
                                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">{item.type}</span>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-amber-500" />
                                </button>
                            ))}
                            {!query && (
                                <div className="p-3">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest pl-2 mb-2">Recent Suggestions</p>
                                    {/* Can implement recent history here later */}
                                    <button onClick={() => handleSelect('/calculators/sine-bar')} className="w-full flex items-center p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-600 dark:text-slate-400">
                                        <Triangle size={14} className="mr-2 opacity-50" /> New: Sine Bar Calculator
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
