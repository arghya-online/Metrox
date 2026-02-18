import React, { useState } from 'react';
import { ArrowLeft, Calculator, Triangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SineBarCalculator() {
    // Mode: 'height' (Find h) or 'angle' (Find theta)
    const [mode, setMode] = useState('height');

    // Inputs
    const [length, setLength] = useState('200'); // Sine bar length (100, 200, 300)
    const [angleDeg, setAngleDeg] = useState('');
    const [angleMin, setAngleMin] = useState('');
    const [angleSec, setAngleSec] = useState('');
    const [height, setHeight] = useState('');

    // Result
    const [result, setResult] = useState(null);

    const calculate = (e) => {
        e.preventDefault();
        const L = parseFloat(length);

        if (mode === 'height') {
            // Find Height h = L * sin(theta)
            const d = parseFloat(angleDeg) || 0;
            const m = parseFloat(angleMin) || 0;
            const s = parseFloat(angleSec) || 0;

            const totalDegrees = d + m / 60 + s / 3600;
            const radians = (totalDegrees * Math.PI) / 180;
            const h = L * Math.sin(radians);

            setResult(`${h.toFixed(4)} mm`);
        } else {
            // Find Angle theta = asin(h / L)
            const h = parseFloat(height);
            if (h > L) {
                setResult("Error: Height cannot be > Length");
                return;
            }
            const radians = Math.asin(h / L);
            const totalDegrees = (radians * 180) / Math.PI;

            const d = Math.floor(totalDegrees);
            const remainderMin = (totalDegrees - d) * 60;
            const m = Math.floor(remainderMin);
            const s = Math.round((remainderMin - m) * 60);

            setResult(`${d}° ${m}' ${s}"`);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 pt-6 pb-24 space-y-6">
            <div className="flex items-center mb-4">
                <Link to="/calculators" className="mr-3 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Sine Bar Calculator</h1>
            </div>

            {/* Mode Switcher */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-sm">
                <button
                    className={`flex-1 py-2 text-sm font-bold rounded-sm transition-colors ${mode === 'height' ? 'bg-white dark:bg-slate-700 shadow-sm text-amber-600' : 'text-slate-500 dark:text-slate-400'}`}
                    onClick={() => { setMode('height'); setResult(null); }}
                >
                    Find Height (h)
                </button>
                <button
                    className={`flex-1 py-2 text-sm font-bold rounded-sm transition-colors ${mode === 'angle' ? 'bg-white dark:bg-slate-700 shadow-sm text-amber-600' : 'text-slate-500 dark:text-slate-400'}`}
                    onClick={() => { setMode('angle'); setResult(null); }}
                >
                    Find Angle (θ)
                </button>
            </div>

            <form onSubmit={calculate} className="bg-white dark:bg-slate-900 p-6 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">

                {/* Sine Bar Length */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sine Bar Length (L)</label>
                    <div className="flex gap-2">
                        {['100', '200', '300'].map((l) => (
                            <button
                                key={l}
                                type="button"
                                onClick={() => setLength(l)}
                                className={`flex-1 py-2 text-sm font-mono font-bold border rounded-sm transition-colors ${length === l ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                            >
                                {l}mm
                            </button>
                        ))}
                    </div>
                </div>

                {mode === 'height' ? (
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Angle (θ)</label>
                        <div className="grid grid-cols-3 gap-2">
                            <input
                                type="number" placeholder="Deg"
                                className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 p-2 text-sm rounded-sm outline-none focus:border-amber-500 font-mono font-bold text-slate-900 dark:text-white"
                                value={angleDeg} onChange={e => setAngleDeg(e.target.value)} required
                            />
                            <input
                                type="number" placeholder="Min"
                                className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 p-2 text-sm rounded-sm outline-none focus:border-amber-500 font-mono font-bold text-slate-900 dark:text-white"
                                value={angleMin} onChange={e => setAngleMin(e.target.value)}
                            />
                            <input
                                type="number" placeholder="Sec"
                                className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 p-2 text-sm rounded-sm outline-none focus:border-amber-500 font-mono font-bold text-slate-900 dark:text-white"
                                value={angleSec} onChange={e => setAngleSec(e.target.value)}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Slip Gauge Height (h)</label>
                        <input
                            type="number" step="any" placeholder="e.g. 52.34"
                            className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 p-3 text-lg rounded-sm outline-none focus:border-amber-500 font-mono font-bold text-slate-900 dark:text-white"
                            value={height} onChange={e => setHeight(e.target.value)} required
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-amber-600 text-white py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-amber-700 transition-colors shadow-sm"
                >
                    Calculate
                </button>
            </form>

            {/* Result Display */}
            {result && (
                <div className="bg-slate-900 text-white p-5 rounded-sm shadow-md text-center animate-fade-in-up">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">{mode === 'height' ? 'Required Slip Gauge Height' : 'Calculated Angle'}</p>
                    <div className="text-3xl font-mono font-bold text-amber-400">{result}</div>
                </div>
            )}

            {/* Diagram */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center opacity-70">
                <div className="relative w-48 h-24 border-b-2 border-slate-900 dark:border-white">
                    {/* Triangle representation */}
                    <div className="absolute left-0 bottom-0 w-full h-full border-l-2 border-slate-400 origin-bottom-left transform -skew-y-12"></div>
                    <div className="absolute left-0 bottom-0 w-[110%] h-[2px] bg-amber-500 origin-bottom-left transform -rotate-12"></div>

                    {/* Labels NOT accurate to geometric drawing, just schematic */}
                    <span className="absolute -left-4 bottom-10 text-xs font-bold font-mono">h</span>
                    <span className="absolute left-20 -top-2 text-xs font-bold font-mono text-amber-600">L (Hypotenuse)</span>
                    <span className="absolute left-8 bottom-2 text-xs font-bold font-mono">θ</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-6 italic">h = L * sin(θ)</p>
            </div>
        </div>
    );
}
