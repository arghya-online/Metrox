import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InputGroup, ResultCard } from '../components/CalculatorComponents';

const schema = z.object({
    pitch: z.number({ invalid_type_error: "Required" }).positive(),
    wireDiameter: z.number({ invalid_type_error: "Required" }).positive(),
    measurementOverWires: z.number({ invalid_type_error: "Required" }).positive(),
});

export default function ThreadWireCalculator() {
    const [result, setResult] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data) => {
        // Formula: E = M - 3w + 0.866025P (For Metric 60 deg)
        // Note: This is an approximation often used in basic metrology labs for "Measurement over wires".
        const effectiveDia = data.measurementOverWires - (3 * data.wireDiameter) + (0.866025 * data.pitch);
        setResult(effectiveDia.toFixed(4));
    };

    return (
        <div className="p-4 pt-6">
            <div className="flex items-center mb-6">
                <Link to="/calculators" className="mr-3 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Thread Wire Calc</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputGroup
                    label="Pitch (P)"
                    {...register("pitch", { valueAsNumber: true })}
                    error={errors.pitch}
                    placeholder="e.g. 1.5"
                />
                <InputGroup
                    label="Wire Diameter (d)"
                    {...register("wireDiameter", { valueAsNumber: true })}
                    error={errors.wireDiameter}
                    placeholder="e.g. 0.895"
                />
                <InputGroup
                    label="Measurement Over Wires (M)"
                    {...register("measurementOverWires", { valueAsNumber: true })}
                    error={errors.measurementOverWires}
                    placeholder="e.g. 10.5"
                />

                <button
                    type="submit"
                    className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium active:scale-[0.98] transition-transform"
                >
                    Calculate
                </button>
            </form>

            {result && (
                <div className="mt-8 space-y-3 animation-fade-in">
                    <h2 className="text-lg font-semibold mb-3">Results</h2>
                    <ResultCard title="Effective Diameter" value={result} />
                </div>
            )}

            <details className="mt-8 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-4 cursor-pointer group">
                <summary className="font-bold uppercase tracking-wider mb-2 list-none flex items-center hover:text-amber-600 transition-colors">
                    <span>How to Use</span>
                    <span className="ml-auto group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Enter the <strong>Pitch</strong> of the thread (distance between threads).</li>
                    <li>Enter the <strong>Wire Diameter</strong> used for measurement.</li>
                    <li>Measure the distance over the wires (<strong>M</strong>) using a micrometer.</li>
                    <li>Calculates <strong>Effective Diameter</strong> (Pitch Diameter) approximation.</li>
                </ol>
            </details>
        </div>
    );
}
