import vernierImg from '../assets/instruments/vernier-caliper.jpg';
import micrometerImg from '../assets/instruments/micrometer.jpg';
import heightGaugeImg from '../assets/instruments/height-gauge.jpg';
import dialIndicatorImg from '../assets/instruments/dial-indicator.jpg';
import sineBarImg from '../assets/instruments/sine-bar.jpg';
import roughnessTesterImg from '../assets/instruments/roughness-tester.jpg';

export const metrologyInstruments = [
    {
        id: "vernier-caliper",
        name: "Vernier Caliper",
        category: "Linear Measurement",
        measures: [
            "External diameter",
            "Internal diameter",
            "Depth"
        ],
        principle: "Vernier scale principle: Difference between 1 Main Scale Division (MSD) and 1 Vernier Scale Division (VSD) gives least count.",
        leastCount: {
            metric: "0.02 mm",
            highPrecision: "0.01 mm"
        },
        range: [
            "0–150 mm",
            "0–300 mm"
        ],
        accuracy: "±0.02 mm",
        resolution: "0.02 mm",
        formula: "Least Count = 1 MSD − 1 VSD",
        commonErrors: [
            "Zero error",
            "Parallax error",
            "Jaw wear",
            "Improper alignment"
        ],
        applications: [
            "Workshop inspection",
            "Shaft measurement",
            "Hole measurement"
        ],
        vivaPoints: [
            "What is least count?",
            "Explain zero error correction",
            "Difference between vernier and micrometer"
        ],
        imageLinks: [
            vernierImg
        ]
    },
    {
        id: "micrometer",
        name: "Micrometer Screw Gauge",
        category: "Linear Measurement",
        measures: [
            "Small diameter",
            "Thickness"
        ],
        principle: "Screw gauge principle: Linear displacement equals pitch × number of rotations.",
        leastCount: {
            metric: "0.01 mm",
            digital: "0.001 mm"
        },
        range: [
            "0–25 mm",
            "25–50 mm",
            "50–75 mm"
        ],
        accuracy: "±0.01 mm",
        resolution: "0.01 mm",
        formula: "Least Count = Pitch / Number of divisions",
        commonErrors: [
            "Backlash error",
            "Temperature expansion",
            "Over-tightening"
        ],
        applications: [
            "Precision shaft measurement",
            "Wire thickness measurement"
        ],
        vivaPoints: [
            "Why ratchet is used?",
            "Define pitch of micrometer",
            "Difference between inside and outside micrometer"
        ],
        imageLinks: [
            micrometerImg
        ]
    },
    {
        id: "height-gauge",
        name: "Vernier Height Gauge",
        category: "Linear Measurement",
        measures: [
            "Vertical height from surface plate"
        ],
        principle: "Uses vernier scale for precise vertical displacement measurement.",
        leastCount: {
            metric: "0.02 mm"
        },
        range: [
            "0–300 mm",
            "0–600 mm"
        ],
        accuracy: "±0.02 mm",
        resolution: "0.02 mm",
        formula: "Least Count = 1 MSD − 1 VSD",
        commonErrors: [
            "Surface plate contamination",
            "Improper squareness",
            "Reading error"
        ],
        applications: [
            "Layout marking",
            "Precision inspection"
        ],
        vivaPoints: [
            "Why surface plate is used?",
            "How to check squareness?"
        ],
        imageLinks: [
            heightGaugeImg
        ]
    },
    {
        id: "dial-indicator",
        name: "Dial Indicator",
        category: "Form Measurement",
        measures: [
            "Runout",
            "Flatness",
            "Alignment"
        ],
        principle: "Rack and pinion mechanism converts small linear displacement into rotational pointer movement.",
        leastCount: {
            standard: "0.01 mm",
            highPrecision: "0.001 mm"
        },
        range: [
            "0–10 mm"
        ],
        accuracy: "±0.01 mm",
        resolution: "0.01 mm",
        formula: "Displacement proportional to pointer rotation",
        commonErrors: [
            "Improper mounting",
            "Magnetic stand vibration",
            "Cosine error"
        ],
        applications: [
            "Shaft alignment",
            "Machine tool inspection"
        ],
        vivaPoints: [
            "Explain cosine error",
            "Why magnetic stand is used?"
        ],
        imageLinks: [
            dialIndicatorImg
        ]
    },
    {
        id: "sine-bar",
        name: "Sine Bar",
        category: "Angular Measurement",
        measures: [
            "Precision angle"
        ],
        principle: "Based on trigonometric relation: sin θ = h / L",
        leastCount: {
            angularAccuracy: "Up to 1 arc minute"
        },
        range: [
            "100 mm",
            "200 mm standard length"
        ],
        accuracy: "High precision (depends on slip gauges)",
        resolution: "Depends on slip gauge combination",
        formula: "θ = sin⁻¹(h / L)",
        commonErrors: [
            "Improper slip gauge wringing",
            "Surface plate contamination",
            "Temperature variation"
        ],
        applications: [
            "Tool angle measurement",
            "Taper inspection"
        ],
        vivaPoints: [
            "Why sine bar cannot measure >45° accurately?",
            "What is wringing?"
        ],
        imageLinks: [
            sineBarImg
        ]
    },
    {
        id: "surface-roughness-tester",
        name: "Surface Roughness Tester",
        category: "Surface Metrology",
        measures: [
            "Ra",
            "Rq",
            "Rz"
        ],
        principle: "Stylus traces surface profile and converts vertical displacement into electrical signal.",
        leastCount: {
            resolution: "0.001 µm"
        },
        range: [
            "Ra 0.05 – 10 µm"
        ],
        accuracy: "Depends on instrument class",
        resolution: "Micron / sub-micron level",
        formula: "Ra = (1/L) ∫ |y(x)| dx",
        commonErrors: [
            "Incorrect cut-off length",
            "Surface contamination",
            "Stylus wear"
        ],
        applications: [
            "Bearing surface inspection",
            "Tribology analysis"
        ],
        vivaPoints: [
            "Difference between Ra and Rz",
            "What is cut-off length?"
        ],
        imageLinks: [
            roughnessTesterImg
        ]
    }
];
