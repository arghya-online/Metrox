import React, { useState } from 'react';
import { ArrowLeft, Layers, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

// M112 Set Definition
const M112 = [
    // Range 1: 1.001 - 1.009 (Steps: 0.001) - 9 blocks
    ...Array.from({ length: 9 }, (_, i) => ({ val: 1.001 + i * 0.001, count: 1 })),
    // Range 2: 1.01 - 1.49 (Steps: 0.01) - 49 blocks
    ...Array.from({ length: 49 }, (_, i) => ({ val: 1.01 + i * 0.01, count: 1 })),
    // Range 3: 0.5 - 24.5 (Steps: 0.5) - 49 blocks
    ...Array.from({ length: 49 }, (_, i) => ({ val: 0.5 + i * 0.5, count: 1 })),
    // Range 4: 25, 50, 75, 100 (Steps: 25) - 4 blocks
    ...[25, 50, 75, 100].map(v => ({ val: v, count: 1 })),
    // Special: 1.0005 (1 block)
    { val: 1.0005, count: 1 }
];

// Helper to format float precision
const fmt = (n) => parseFloat(n.toFixed(4));

export default function SlipGaugeBuilder() {
    const [target, setTarget] = useState('29.875');
    const [stack, setStack] = useState([]);
    const [error, setError] = useState('');

    const calculateStack = (e) => {
        e.preventDefault();
        setError('');
        setStack([]);

        let remaining = parseFloat(target);
        if (isNaN(remaining) || remaining <= 0) {
            setError("Please enter a valid positive number");
            return;
        }

        // Deep copy available blocks to track usage (simple M112 typically has 1 of each)
        let available = JSON.parse(JSON.stringify(M112)).sort((a, b) => a.val - b.val); // Sort asc for checking

        let builtStack = [];

        // --- Step 1: 4th Decimal Place (0.0005) ---
        // If it ends in 5 at 4th decimal, we MUST use 1.0005
        let remStr = remaining.toFixed(4);
        if (remStr.endsWith('5')) {
            const block = 1.0005;
            if (remaining >= block) {
                remaining = fmt(remaining - block);
                builtStack.push(block);
                // remove from available
                const idx = available.findIndex(b => Math.abs(b.val - block) < 0.0001);
                if (idx > -1) available.splice(idx, 1);
            }
        }

        // --- Step 2: 3rd Decimal Place (0.00X) ---
        // We typically use the 1.001 - 1.009 series here
        // E.g. remaining is 28.87. We want to clear the '7' (0.007 part is handled? No, logic is tricky)
        // Standard Algorithm:
        // 1. Last digit is 'd'. Find block X.XXd to subtract so result ends in 0.

        // Let's implement the standard "Tail Subtraction" logic loop

        // We need to reduce remaining until it is 0.
        // In each step, we try to eliminate the methodically right-most non-zero digit
        // using the smallest available range that affects that digit.

        // Available Ranges for Reference:
        // 1. 1.001 - 1.009 (Resolves 3rd decimal)
        // 2. 1.01 - 1.49 (Resolves 2nd decimal)
        // 3. 0.5 - 24.5 (Resolves 1st decimal .5 or .0)
        // 4. 25-100 (Resolves integers)

        const solve = () => {
            // 1. Check 3rd Decimal
            let r3 = Math.round(remaining * 1000) % 10; // The 3rd decimal digit
            if (r3 !== 0) {
                // We need a block ending in ...X that matches this digit.
                // Range 1 (1.001 - 1.009) is perfect for this.
                // We need a block that makes (remaining - block) have 0 at 3rd decimal.
                // Actually, we just pick 1.00(r3) usually.
                // BUT current remainder might be e.g. ...7. We assume we subtract 1.007.
                // Let's try to find a block in available closest to 1.00x

                // However, sometimes we might need e.g. 1.009.
                // Let's start basic: Try to find a block B in Range 1 such that (remaining - B) * 100 is integer-ish.

                let targetBlockVal = 1 + (r3 / 1000); // 1.001 to 1.009
                // Check if available
                let idx = available.findIndex(b => Math.abs(b.val - targetBlockVal) < 0.0001);

                // If not available (maybe used), warn? Or try simplified logic
                if (idx > -1 && remaining >= targetBlockVal) {
                    remaining = fmt(remaining - targetBlockVal);
                    builtStack.push(targetBlockVal);
                    available.splice(idx, 1);
                }
            }

            // 2. Check 2nd Decimal
            // Range 2: 1.01 to 1.49.
            // We want to eliminate the last two decimals now.
            // E.g. Remainder 27.80. Last two are .80. 
            // We need a block X.80? No, range is 1.01-1.49.
            // So if we have .80, we can't do 1.80.
            // We might subtract 1.30 and 1.50? No, we subtract ONE block.
            // Wait, standard method:
            // Last two digits are 'XY'. We find 1.XY.
            // If XY < 49 (and > 01), we use 1.XY.
            // If XY > 49 (e.g. .80), we can't use 1.80.
            // We standardly subtract 1.something to leave a .0 or .5 for the next set?
            // Actually, Range 3 has 0.5 steps. So we need to reach a state ending in .0 or .5.
            // So, from .XY, we want to reach .00 or .50.
            // Example: .87 -> Subtract 1.37 -> Results in .50. (1.37 is in 1.01-1.49)
            // Example: .40 -> Subtract 1.40 -> Results in .00.

            // So: Find block B in 1.01-1.49 such that (remaining - B) ends in .0 or .5

            let currentDec = Math.round((remaining % 1) * 100); // 0 to 99
            let built2 = false;

            // Try to find a block that leaves .00
            // We need B_dec = currentDec. So Block = 1.currentDec.
            // Possible only if 1 <= currentDec <= 49.
            if (currentDec >= 1 && currentDec <= 49) {
                let tryVal = 1 + (currentDec / 100);
                let idx = available.findIndex(b => Math.abs(b.val - tryVal) < 0.0001);
                if (idx > -1 && remaining >= tryVal) {
                    remaining = fmt(remaining - tryVal);
                    builtStack.push(tryVal);
                    available.splice(idx, 1);
                    built2 = true;
                }
            }

            // If not built (maybe currentDec > 49, e.g. 80), try to leave .50
            if (!built2) {
                // We want (remaining - B) % 1 == 0.5
                // So B_dec should be (currentDec - 50).
                // e.g. .80 - .30 = .50. Block 1.30.
                if (currentDec >= 50) { // e.g. 51 to 99. (50 is .50, handled by next set)
                    let targetDec = currentDec - 50;
                    if (targetDec >= 1 && targetDec <= 49) {
                        let tryVal = 1 + (targetDec / 100);
                        let idx = available.findIndex(b => Math.abs(b.val - tryVal) < 0.0001);
                        if (idx > -1 && remaining >= tryVal) {
                            remaining = fmt(remaining - tryVal);
                            builtStack.push(tryVal);
                            available.splice(idx, 1);
                            built2 = true;
                        }
                    }
                }
            }

            // 3. Check 1st Decimal (.0 or .5) & Integers
            // Range 3: 0.5 - 24.5 (Steps 0.5)
            // Range 4: 25, 50, 75, 100.

            // Now remaining should be something like 24.5 or 12.0 or 87.5
            // We simply take the largest possible block repeatedly?
            // Actually, we usually take the nearest block from Range 3 that leaves an integer or 0?
            // Just Greedy approach works fine here for standard sets.

            // Sort available blocks descending for greedy fit
            available.sort((a, b) => b.val - a.val);

            while (remaining > 0.0001 && available.length > 0) {
                // Find largest block <= remaining
                let bestIdx = available.findIndex(b => b.val <= remaining + 0.0001);
                if (bestIdx > -1) {
                    let b = available[bestIdx];
                    remaining = fmt(remaining - b.val);
                    builtStack.push(b.val);
                    available.splice(bestIdx, 1);
                } else {
                    break; // Cannot fulfill
                }
            }
        };

        solve();

        if (remaining > 0.0001) {
            setError(`Could not build exact height. Remaining: ${remaining} mm`);
        }

        setStack(builtStack);
    };

    return (
        <div className="max-w-2xl mx-auto p-4 pt-6 pb-24 space-y-6">
            <div className="flex items-center mb-4">
                <Link to="/calculators" className="mr-3 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Slip Gauge Builder</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">M112 Set (Tail-first Method)</p>
                </div>
            </div>

            <form onSubmit={calculateStack} className="bg-white dark:bg-slate-900 p-6 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Height (mm)</label>
                    <div className="flex gap-2">
                        <input
                            type="number" step="0.0001"
                            className="flex-1 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 p-3 text-lg rounded-sm outline-none focus:border-amber-500 font-mono font-bold text-slate-900 dark:text-white"
                            placeholder="e.g. 29.875"
                            value={target} onChange={e => setTarget(e.target.value)}
                        />
                        <button type="submit" className="bg-amber-600 text-white px-6 rounded-sm font-bold uppercase tracking-wider hover:bg-amber-700 transition-colors">
                            Build
                        </button>
                    </div>
                </div>
                {error && <div className="text-red-500 text-xs font-bold flex items-center"><Info size={12} className="mr-1" /> {error}</div>}
            </form>

            {/* Results Visualization */}
            {stack.length > 0 && (
                <div className="grid md:grid-cols-2 gap-8 animate-fade-in">

                    {/* List */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
                        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700 font-bold text-xs uppercase text-slate-600 dark:text-slate-300">
                            Block Selection Sequence
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {stack.map((b, i) => (
                                <div key={i} className="flex justify-between p-3 text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Block {i + 1}</span>
                                    <span className="font-mono font-bold text-slate-900 dark:text-white">{b.toFixed(4)} mm</span>
                                </div>
                            ))}
                            <div className="flex justify-between p-3 bg-amber-50 dark:bg-amber-900/10 border-t border-slate-200 dark:border-slate-700">
                                <span className="font-bold text-amber-700 dark:text-amber-500">Total</span>
                                <span className="font-mono font-bold text-amber-700 dark:text-amber-500">
                                    {stack.reduce((a, c) => a + c, 0).toFixed(4)} mm
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Stack */}
                    <div className="flex flex-col items-center justify-end min-h-[300px] bg-slate-50 dark:bg-black/50 rounded-sm border border-slate-200 dark:border-slate-800 p-8 relative">
                        <div className="text-xs text-slate-400 absolute top-4 left-4 uppercase tracking-widest">Visual Stack</div>
                        <div className="flex flex-col-reverse items-center shadow-xl">
                            {stack.map((b, i) => (
                                <div
                                    key={i}
                                    title={`${b} mm`}
                                    className="w-32 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 border-y border-white/20 dark:border-black/20 flex items-center justify-center text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 shadow-sm transition-transform hover:scale-105"
                                    style={{ height: `${Math.max(20, Math.min(60, b * 2))}px` }}
                                >
                                    {b}
                                </div>
                            ))}
                        </div>
                        <div className="w-48 h-2 bg-slate-800 dark:bg-slate-200 mt-1 rounded-full opacity-20"></div>
                        <div className="mt-4 text-xs font-mono text-slate-500">Surface Plate</div>
                    </div>

                </div>
            )}
        </div>
    );
}
