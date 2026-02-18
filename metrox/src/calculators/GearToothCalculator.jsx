import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InputGroup, ResultCard } from '../components/CalculatorComponents';

const schema = z.object({
    module: z.number({ invalid_type_error: "Required" }).positive(),
    teeth: z.number({ invalid_type_error: "Required" }).int().positive(),
});

export default function GearToothCalculator() {
    const [results, setResults] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data) => {
        // Canvas formulas
        const circularPitch = Math.PI * data.module;
        const toothThickness = circularPitch / 2;
        const addendum = data.module;

        setResults({
            circularPitch: circularPitch.toFixed(4),
            toothThickness: toothThickness.toFixed(4),
            addendum: addendum.toFixed(4)
        });
    };

    return (
        <div className="p-4 pt-6">
            <div className="flex items-center mb-6">
                <Link to="/calculators" className="mr-3 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Gear Tooth Calc</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputGroup
                    label="Module (m)"
                    {...register("module", { valueAsNumber: true })}
                    error={errors.module}
                    placeholder="e.g. 2"
                />
                <InputGroup
                    label="Number of Teeth (N)"
                    {...register("teeth", { valueAsNumber: true })}
                    error={errors.teeth}
                    placeholder="e.g. 20"
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
                    <ResultCard title="Circular Pitch" value={results.circularPitch} />
                    <ResultCard title="Tooth Thickness" value={results.toothThickness} />
                    <ResultCard title="Addendum" value={results.addendum} />
                </div>
            )}

            <details className="mt-8 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-4 cursor-pointer group">
                <summary className="font-bold uppercase tracking-wider mb-2 list-none flex items-center hover:text-amber-600 transition-colors">
                    <span>How to Use</span>
                    <span className="ml-auto group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Enter the <strong>Module</strong> of the gear (from design data).</li>
                    <li>Enter the <strong>Number of Teeth</strong> on the gear.</li>
                    <li>Calculates <strong>Theoretical Chordal Thickness</strong> and <strong>Addendum</strong> height for setting the Gear Tooth Vernier.</li>
                </ol>
            </details>
        </div>
    );
}
