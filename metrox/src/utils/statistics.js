/**
 * Metrology Statistics Utilities
 */

export const calculateStatistics = (readings, targetValue, tolerance) => {
    if (!readings || readings.length === 0) return null;

    const n = readings.length;
    const sum = readings.reduce((a, b) => a + b, 0);
    const mean = sum / n;

    // Standard Deviation (Sample)
    const variance = readings.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
    const sd = n > 1 ? Math.sqrt(variance) : 0;

    const max = Math.max(...readings);
    const min = Math.min(...readings);
    const range = max - min;

    let upperLimit = null;
    let lowerLimit = null;
    let cp = null;
    let cpk = null;
    let outOfSpec = 0;

    if (targetValue !== '' && tolerance !== '') {
        const tv = parseFloat(targetValue);
        const tol = parseFloat(tolerance);

        if (!isNaN(tv) && !isNaN(tol)) {
            upperLimit = tv + tol;
            lowerLimit = tv - tol;

            // Check out of spec
            outOfSpec = readings.filter(r => r > upperLimit || r < lowerLimit).length;

            // Process Capability (Cp) = (USL - LSL) / 6σ
            if (sd > 0) {
                cp = (upperLimit - lowerLimit) / (6 * sd);

                // Process Capability Index (Cpk) = min((USL - μ) / 3σ, (μ - LSL) / 3σ)
                const cpkUpper = (upperLimit - mean) / (3 * sd);
                const cpkLower = (mean - lowerLimit) / (3 * sd);
                cpk = Math.min(cpkUpper, cpkLower);
            }
        }
    }

    return {
        n,
        mean: mean,
        sd: sd,
        range: range,
        min: min,
        max: max,
        upperLimit,
        lowerLimit,
        cp,
        cpk,
        outOfSpec
    };
};

export const createHistogramData = (readings, binCount = 10) => {
    if (!readings || readings.length === 0) return [];

    const min = Math.min(...readings);
    const max = Math.max(...readings);

    // Avoid creating bins if all values are the same
    if (min === max) {
        return [{ binStart: min, binEnd: max, count: readings.length, label: min.toFixed(3) }];
    }

    // Add slight padding to include min/max
    const range = max - min;
    const binSize = (range * 1.01) / binCount;
    const start = min - (range * 0.005);

    const bins = Array(binCount).fill(0).map((_, i) => ({
        binStart: start + (i * binSize),
        binEnd: start + ((i + 1) * binSize),
        count: 0,
        label: (start + (i * binSize) + (binSize / 2)).toFixed(3) // Midpoint label
    }));

    readings.forEach(val => {
        const binIndex = Math.min(
            Math.floor((val - start) / binSize),
            binCount - 1
        );
        if (binIndex >= 0) {
            bins[binIndex].count++;
        }
    });

    return bins;
};
