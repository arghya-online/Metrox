import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InputGroup, ResultCard } from '../components/CalculatorComponents';

const schema = z.object({
    mainScaleDiv: z.number({ invalid_type_error: "Required" }).positive(),
    vernierDivs: z.number({ invalid_type_error: "Required" }).int().positive(),
});

export default function LeastCountCalculator() {
    const [result, setResult] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data) => {
        const lc = data.mainScaleDiv / data.vernierDivs;
        setResult(lc.toFixed(4));
    };

    return (
        <div className="p-4 pt-6">
            <div className="flex items-center mb-6">
                <Link to="/calculators" className="mr-3 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Least Count</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputGroup
                    label="Value of 1 Main Scale Div"
                    {...register("mainScaleDiv", { valueAsNumber: true })}
                    error={errors.mainScaleDiv}
                    placeholder="e.g. 1.0 (mm)"
                />
                <InputGroup
                    label="Total Vernier Divisions"
                    {...register("vernierDivs", { valueAsNumber: true })}
                    error={errors.vernierDivs}
                    placeholder="e.g. 50"
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
                    <ResultCard title="Least Count" value={result} />
                </div>
            )}

            <details className="mt-8 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-4 cursor-pointer group">
                <summary className="font-bold uppercase tracking-wider mb-2 list-none flex items-center hover:text-amber-600 transition-colors">
                    <span>How to Use</span>
                    <span className="ml-auto group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Determine the value of <strong>1 Main Scale Division</strong> (usually 1mm or 0.5mm).</li>
                    <li>Count the <strong>Total Vernier Divisions</strong> on the sliding scale.</li>
                    <li>The calculator divides Main Scale Value by Total Vernier Scale Divisions.</li>
                </ol>
            </details>
        </div>
    );
}
