import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InputGroup, ResultCard } from '../components/CalculatorComponents';

const schema = z.object({
    nominalSize: z.number({ invalid_type_error: "Required" }),
    upperDev: z.number({ invalid_type_error: "Required" }),
    lowerDev: z.number({ invalid_type_error: "Required" }),
});

export default function ToleranceCalculator() {
    const [results, setResults] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data) => {
        const upperLimit = data.nominalSize + data.upperDev;
        const lowerLimit = data.nominalSize + data.lowerDev;
        const tolerance = Math.abs(upperLimit - lowerLimit);

        setResults({
            upperLimit: upperLimit.toFixed(4),
            lowerLimit: lowerLimit.toFixed(4),
            tolerance: tolerance.toFixed(4)
        });
    };

    return (
        <div className="p-4 pt-6">
            <div className="flex items-center mb-6">
                <Link to="/calculators" className="mr-3 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Tolerance Calc</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputGroup
                    label="Nominal Size"
                    {...register("nominalSize", { valueAsNumber: true })}
                    error={errors.nominalSize}
                    placeholder="e.g. 25.00"
                />
                <InputGroup
                    label="Upper Deviation"
                    {...register("upperDev", { valueAsNumber: true })}
                    error={errors.upperDev}
                    placeholder="e.g. 0.05"
                />
                <InputGroup
                    label="Lower Deviation"
                    {...register("lowerDev", { valueAsNumber: true })}
                    error={errors.lowerDev}
                    placeholder="e.g. -0.05"
                />

                <button
                    type="submit"
                    className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium active:scale-[0.98] transition-transform"
                >
                    Calculate
                </button>
            </form>

            {results && (
                <div className="mt-8 space-y-3 animation-fade-in">
                    <h2 className="text-lg font-semibold mb-3">Results</h2>
                    <ResultCard title="Upper Limit" value={results.upperLimit} />
                    <ResultCard title="Lower Limit" value={results.lowerLimit} />
                    <ResultCard title="Total Tolerance" value={results.tolerance} />
                </div>
            )}

            <details className="mt-8 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-4 cursor-pointer group">
                <summary className="font-bold uppercase tracking-wider mb-2 list-none flex items-center hover:text-amber-600 transition-colors">
                    <span>How to Use</span>
                    <span className="ml-auto group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Input the <strong>Nominal Size</strong> (basic size).</li>
                    <li>Input <strong>Upper Deviation</strong> (e.g., +0.02).</li>
                    <li>Input <strong>Lower Deviation</strong> (e.g., -0.01).</li>
                    <li>Result shows the maximum and minimum limits of size.</li>
                </ol>
            </details>
        </div>
    );
}
