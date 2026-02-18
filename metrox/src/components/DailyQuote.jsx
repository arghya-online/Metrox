import React, { useMemo } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
    "Measurement is the first step that leads to control and eventually to improvement. – H. James Harrington",
    "If you cannot measure it, you cannot improve it. – Lord Kelvin",
    "Precision is not just a requirement; it's a way of life for engineers.",
    "Metrology: The science where details matter the most.",
    "Engineering is the art of organizing and directing men and controlling the forces and materials of nature for the benefit of the human race.",
    "Quality is not an act, it is a habit. – Aristotle",
    "One accurate measurement is worth a thousand expert opinions. – Grace Hopper",
    "In God we trust. All others must bring data. – W. Edwards Deming"
];

export default function DailyQuote() {
    const quote = useMemo(() => {
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        return quotes[dayOfYear % quotes.length];
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 pb-12 rounded-none md:rounded-b-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Quote size={64} className="text-white" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto mt-2">
                <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Daily Inspiration</p>
                <p className="text-white text-lg md:text-xl font-medium leading-relaxed font-serif italic">
                    "{quote}"
                </p>
            </div>
        </div>
    );
}
