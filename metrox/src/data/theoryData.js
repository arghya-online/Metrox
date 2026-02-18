export const theoryTopics = [

    {
        id: 'error-accuracy-advanced',
        title: 'Advanced Error Theory, Accuracy & Measurement Uncertainty',
        content: {
            definition: `
Measurement error is defined as the algebraic difference between measured value and reference value.
Errors are classified as:
1. Systematic Errors (bias, drift, calibration shift)
2. Random Errors (Gaussian distributed, stochastic variation)
3. Gross Errors (human, recording mistakes)

Uncertainty quantification follows ISO GUM framework.
Type A evaluation: statistical (standard deviation).
Type B evaluation: non-statistical (manufacturer data, calibration certificate).

Uncertainty budget includes sensitivity coefficients, probability distribution, and degrees of freedom.
`,
            formula: `
Total Error = Systematic + Random
Standard Deviation: σ = √[Σ(xi - μ)² / (n - 1)]
Combined Uncertainty: uc = √Σ(ui²)
Expanded Uncertainty: U = k × uc
Welch–Satterthwaite: νeff = uc⁴ / Σ(ui⁴ / νi)
`,
            application: `
Used in aerospace qualification, ISO 17025 lab accreditation,
calibration labs, CMM uncertainty estimation, and nuclear component validation.
`
        }
    },

    {
        id: 'dimensional-metrology-fundamentals',
        title: 'Dimensional Metrology & Standards',
        content: {
            definition: `
Dimensional metrology deals with length, angle, and geometric parameter measurement.
Traceability is maintained through calibration hierarchy:
SI Unit → National Standard → Secondary Standard → Working Standard.

Slip gauges (Johansson gauges) form the basis of length standardization.
Abbe’s Principle states measurement error is proportional to sine of angular misalignment multiplied by offset.
`,
            formula: `
Abbe Error = L × sin(θ)
Gauge Combination = Σ Slip Gauge Blocks
Angular Measurement Error ≈ L × θ (for small angles)
`,
            application: `
Machine tool calibration,
micrometer verification,
precision jig boring,
defense manufacturing quality assurance.
`
        }
    },

    {
        id: 'limits-fits-tolerances-advanced',
        title: 'Limits, Fits & Tolerance Engineering',
        content: {
            definition: `
Fits determine assembly relationship between shaft and hole.
Clearance Fit, Transition Fit, Interference Fit.

ISO 286 defines IT grades and fundamental deviations.
Statistical tolerancing integrates process capability into design stage.
Functional tolerancing ensures performance under worst-case loading.
`,
            formula: `
Tolerance = Upper Limit − Lower Limit
Allowance = Minimum Clearance or Maximum Interference
Standard Tolerance Unit: i = 0.45∛D + 0.001D (microns)
`,
            application: `
Engine crankshaft bearing fit,
gearbox housing alignment,
hydraulic piston-cylinder assembly,
precision robotics joints.
`
        }
    },

    {
        id: 'gdandt-advanced',
        title: 'Geometric Dimensioning & Tolerancing – Advanced Control',
        content: {
            definition: `
GD&T controls form, orientation, profile, location, and runout.
Based on ASME Y14.5 standard.

Datum Reference Frame establishes coordinate system.
True position defines cylindrical tolerance zone.
MMC & LMC introduce bonus tolerance concept.

Profile tolerance controls complex surfaces.
`,
            formula: `
True Position = √[(2Δx)² + (2Δy)²]
Virtual Condition = MMC ± Geometric Tolerance
`,
            application: `
Aerospace turbine disk,
automotive engine block,
CNC multi-axis machining,
robotic assembly alignment.
`
        }
    },

    {
        id: 'surface-integrity-tribology',
        title: 'Surface Integrity, Roughness & Tribological Effects',
        content: {
            definition: `
Surface integrity includes:
• Roughness
• Waviness
• Lay
• Residual stress
• Microhardness changes

Tribology studies friction, wear, lubrication regime.
Abbott-Firestone curve predicts bearing area.
Surface skewness (Rsk) indicates peak/valley dominance.
`,
            formula: `
Ra = (1/L) ∫ |y(x)| dx
Rq = √[(1/L) ∫ y²(x) dx]
Hertz Contact Stress: σmax = 0.418 √(P/a²)
`,
            application: `
Bearing life prediction,
gear tooth wear,
additive manufacturing surface validation,
IC engine piston ring optimization.
`
        }
    },

    {
        id: 'measurement-system-dynamics',
        title: 'Dynamic Behavior of Measurement Systems',
        content: {
            definition: `
Measurement systems behave as dynamic systems:
Zero order – no lag
First order – exponential response
Second order – oscillatory response

Key parameters:
• Time constant
• Natural frequency
• Damping ratio
• Bandwidth
`,
            formula: `
First Order: τ(dy/dt) + y = Kx
Second Order: m(d²x/dt²) + c(dx/dt) + kx = F(t)
Damping Ratio ζ = c / (2√km)
`,
            application: `
Strain gauge vibration measurement,
accelerometers,
transient temperature sensing,
shock loading analysis.
`
        }
    },

    {
        id: 'optical-metrology',
        title: 'Optical & Laser-Based Metrology',
        content: {
            definition: `
Optical metrology uses light interference and diffraction.
Michelson interferometer measures displacement.
Laser Doppler velocimetry measures velocity.
White light interferometry measures nano-scale topography.
`,
            formula: `
Path Difference = nλ
Displacement = (Fringes × λ)/2
Velocity = Δf × λ / 2
`,
            application: `
Semiconductor wafer inspection,
CNC linear axis calibration,
nanotechnology research,
surface nano-roughness evaluation.
`
        }
    },

    {
        id: 'cmm-error-modeling',
        title: 'CMM Error Modeling & Volumetric Compensation',
        content: {
            definition: `
CMM errors include:
• Scale error
• Straightness error
• Squareness error
• Thermal drift
• Probe lobing error

Kinematic modeling uses 21 geometric error components.
Volumetric compensation improves measurement accuracy.
`,
            formula: `
Volumetric Error = √(Ex² + Ey² + Ez²)
Abbe Offset Error = Angular Error × Offset
`,
            application: `
Engine block inspection,
mold & die verification,
aerospace structural components.
`
        }
    },

    {
        id: 'statistical-quality-control',
        title: 'Statistical Quality Control & Process Capability',
        content: {
            definition: `
SPC uses control charts:
• X-bar chart
• R chart
• p chart
• c chart

Six Sigma methodology: DMAIC
Process capability indices measure fitness.
`,
            formula: `
Cp = (USL − LSL) / 6σ
Cpk = Min[(USL − μ)/(3σ), (μ − LSL)/(3σ)]
`,
            application: `
Automotive mass production,
precision CNC operations,
ISO/TS 16949 compliance.
`
        }
    },

    {
        id: 'gear-metrology-advanced',
        title: 'Gear Metrology & Transmission Error Analysis',
        content: {
            definition: `
Gear errors:
• Profile error
• Lead error
• Pitch error
• Runout

Transmission error causes NVH issues.
Measured using double flank testers and coordinate gear measurement machines.
`,
            formula: `
Module m = D / Z
Circular Pitch = πm
Transmission Error = Angular deviation under load
`,
            application: `
Wind turbine gearbox,
robotic actuator drives,
aerospace propulsion systems.
`
        }
    },

    {
        id: 'advanced-form-errors',
        title: 'Form & Geometric Error Separation Techniques',
        content: {
            definition: `
Roundness measurement methods:
• Least squares circle
• Minimum zone circle
• Polar graph method

Error separation removes spindle error from artifact error.
Harmonic analysis decomposes roundness profile.
`,
            formula: `
Roundness Error = Maximum radial deviation
Fourier Series: r(θ) = a0 + Σ(an cos nθ + bn sin nθ)
`,
            application: `
High precision spindles,
bearing raceways,
precision shafts.
`
        }
    },

    {
        id: 'uncertainty-propagation-advanced',
        title: 'Advanced Uncertainty Propagation & Sensitivity Analysis',
        content: {
            definition: `
When measurand depends on multiple variables,
uncertainty propagates via sensitivity coefficients.
Correlated inputs require covariance terms.

Monte Carlo simulation used for nonlinear systems.
`,
            formula: `
uc(y) = √Σ[(∂y/∂xi ui)² + 2ΣΣ(∂y/∂xi ∂y/∂xj uij)]
`,
            application: `
Stress-strain experiments,
fluid flow coefficient measurement,
complex dimensional chain analysis.
`
        }
    },

    {
        id: 'nano-metrology',
        title: 'Nano-Metrology & Emerging Measurement Technologies',
        content: {
            definition: `
Nano-metrology deals with measurements below 100 nm.
Atomic Force Microscopy (AFM) measures atomic-scale surface.
Scanning Electron Microscopy (SEM) used for microstructure measurement.

Quantum-based length standards emerging.
`,
            formula: `
Resolution ≈ λ / (2NA)
Tip-Sample Force ≈ k × deflection
`,
            application: `
MEMS fabrication,
semiconductor manufacturing,
nano-coatings validation.
`
        }
    }

];
