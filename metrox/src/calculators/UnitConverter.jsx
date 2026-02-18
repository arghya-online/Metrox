import React, { useState } from 'react';
import { ArrowLeftRight, ChevronDown } from 'lucide-react';

const unitTypes = {
    length: {
        label: "Length",
        units: {
            mm: 1,
            cm: 10,
            m: 1000,
            inch: 25.4,
            ft: 304.8
        }
    },
    mass: {
        label: "Mass",
        units: {
            mg: 0.001,
            g: 1,
            kg: 1000,
            lb: 453.592
        }
    },
    pressure: {
        label: "Pressure",
        units: {
            pa: 1,
            kpa: 1000,
            bar: 100000,
            psi: 6894.76
        }
    }
};

export default function UnitConverter() {
    const [type, setType] = useState('length');
    const [amount, setAmount] = useState(1);
    const [fromUnit, setFromUnit] = useState('mm');
    const [toUnit, setToUnit] = useState('inch');

    const handleTypeChange = (newType) => {
        setType(newType);
        const units = Object.keys(unitTypes[newType].units);
        setFromUnit(units[0]);
        setToUnit(units[1]);
    };

    const calculate = () => {
        if (!amount) return '---';
        const baseValue = amount * unitTypes[type].units[fromUnit];
        const result = baseValue / unitTypes[type].units[toUnit];
        return Number(result.toFixed(4));
    };

    return (
        <div className="max-w-md mx-auto p-4 space-y-6">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-800">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-white mb-6 flex items-center">
                    <ArrowLeftRight className="mr-2 text-blue-500" />
                    Unit Converter
                </h2>

                {/* Type Selector */}
                <div className="flex space-x-2 mb-6 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
                    {Object.keys(unitTypes).map((key) => (
                        <button
                            key={key}
                            onClick={() => handleTypeChange(key)}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${type === key
                                ? 'bg-white dark:bg-neutral-600 shadow text-blue-600 dark:text-blue-300'
                                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                                }`}
                        >
                            {unitTypes[key].label}
                        </button>
                    ))}
                </div>

                {/* Converter Inputs */}
                <div className="space-y-4">
                    <div className="relative">
                        <label className="text-xs font-bold text-neutral-400 uppercase ml-1">From</label>
                        <div className="flex items-center mt-1">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full text-3xl font-bold bg-transparent border-none focus:ring-0 p-0 text-neutral-900 dark:text-white"
                            />
                            <div className="relative">
                                <select
                                    value={fromUnit}
                                    onChange={(e) => setFromUnit(e.target.value)}
                                    className="appearance-none bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold py-2 pl-3 pr-8 rounded-lg outline-none"
                                >
                                    {Object.keys(unitTypes[type].units).map(u => (
                                        <option key={u} value={u}>{u}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-2 top-3 text-neutral-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center -my-2 relative z-10">
                        <div className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-full border-4 border-white dark:border-neutral-900">
                            <ArrowLeftRight size={16} className="text-neutral-500" />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="text-xs font-bold text-neutral-400 uppercase ml-1">To</label>
                        <div className="flex items-center justify-between mt-1 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{calculate()}</span>
                            <div className="relative">
                                <select
                                    value={toUnit}
                                    onChange={(e) => setToUnit(e.target.value)}
                                    className="appearance-none bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold py-2 pl-3 pr-8 rounded-lg outline-none shadow-sm"
                                >
                                    {Object.keys(unitTypes[type].units).map(u => (
                                        <option key={u} value={u}>{u}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-2 top-3 text-neutral-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Guide */}
                <details className="text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800 pt-4 cursor-pointer group">
                    <summary className="font-bold uppercase tracking-wider mb-2 list-none flex items-center hover:text-amber-600 transition-colors">
                        <span>How to Use</span>
                        <span className="ml-auto group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <ol className="list-decimal list-inside space-y-1 pl-1">
                        <li>Select the property type (Length, Mass, or Pressure).</li>
                        <li>Enter the value in the input field.</li>
                        <li>Select the source unit from the first dropdown.</li>
                        <li>Select the target unit from the second dropdown.</li>
                        <li>The result updates automatically.</li>
                    </ol>
                    <p className="mt-2 italic opacity-75">All conversions use standard ISO factors.</p>
                </details>
            </div>
        </div>
    );
}
