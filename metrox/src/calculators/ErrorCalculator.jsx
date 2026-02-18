import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InputGroup, ResultCard } from '../components/CalculatorComponents';

const schema = z.object({
    trueValue: z.number({ invalid_type_error: "Required" }).min(0.000001, "Must be non-zero"),
    measuredValue: z.number({ invalid_type_error: "Required" }),
});

export default function ErrorCalculator() {
    const [results, setResults] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data) => {
        const absError = Math.abs(data.measuredValue - data.trueValue);
        const relError = absError / data.trueValue;
        const percError = relError * 100;

        setResults({
            absError: absError.toFixed(4),
            relError: relError.toFixed(6),
            percError: percError.toFixed(3)
        });
    };

    return (
        <div className="p-4 pt-6">
            <div className="flex items-center mb-6">
                <Link to="/calculators" className="mr-3 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Error Calculator</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputGroup
                    label="True Value"
                    {...register("trueValue", { valueAsNumber: true })}
                    error={errors.trueValue}
                    placeholder="e.g. 10.00"
                />
                <InputGroup
                    label="Measured Value"
                    {...register("measuredValue", { valueAsNumber: true })}
                    error={errors.measuredValue}
                    placeholder="e.g. 10.05"
                />

                <button
                    type="submit"
                    className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium active:scale-[0.98] transition-transform"
                >
                    Calculate Result
                </button>
            </form>

            {results && (
                <div className="mt-8 space-y-3 animation-fade-in">
                    <h2 className="text-lg font-semibold mb-3">Results</h2>
                    <ResultCard title="Absolute Error" value={results.absError} />
                    <ResultCard title="Relative Error" value={results.relError} />
                    <ResultCard title="Percentage Error" value={results.percError} unit="%" />
                </div>
            )}

            <details className="mt-8 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-4 cursor-pointer group">
                <summary className="font-bold uppercase tracking-wider mb-2 list-none flex items-center hover:text-amber-600 transition-colors">
                    <span>How to Use</span>
                    <span className="ml-auto group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Enter the <strong>True Value</strong> (theoretical or standard value).</li>
                    <li>Enter the <strong>Measured Value</strong> obtained from your instrument.</li>
                    <li>Click Calculate to see Absolute, Relative, and Percentage errors.</li>
                </ol>
            </details>
        </div>
    );
}
