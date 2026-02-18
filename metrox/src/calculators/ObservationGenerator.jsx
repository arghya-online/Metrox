import React, { useState } from 'react';
import { ArrowLeft, FileText, Plus, Trash2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ObservationGenerator() {
    const [instrument, setInstrument] = useState('Vernier Caliper');
    const [leastCount, setLeastCount] = useState(0.02);
    const [rows, setRows] = useState([
        { msr: '', vsc: '' },
        { msr: '', vsc: '' },
        { msr: '', vsc: '' },
        { msr: '', vsc: '' },
        { msr: '', vsc: '' },
    ]);

    // Dynamic precision based on Least Count
    const getPrecision = (lc) => {
        if (!lc) return 2;
        const str = lc.toString();
        if (str.includes('.')) return str.split('.')[1].length;
        return 2;
    };

    const handleInstrumentChange = (e) => {
        const val = e.target.value;
        setInstrument(val);
        // Set default LC based on instrument
        if (val === 'Vernier Caliper') setLeastCount(0.02);
        else if (val === 'Micrometer') setLeastCount(0.01);
        else if (val === 'Height Gauge') setLeastCount(0.02);
    };

    const handleRowChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    const addRow = () => {
        setRows([...rows, { msr: '', vsc: '' }]);
    };

    const deleteRow = (index) => {
        if (rows.length > 1) {
            const newRows = rows.filter((_, i) => i !== index);
            setRows(newRows);
        }
    };

    const calculateTotal = (msr, vsc) => {
        const m = parseFloat(msr);
        const v = parseFloat(vsc);
        const lc = parseFloat(leastCount);
        if (isNaN(m) || isNaN(v) || isNaN(lc)) return '-';

        const precision = getPrecision(leastCount);
        return (m + (v * lc)).toFixed(precision);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const precision = getPrecision(leastCount);

        // Header
        doc.setFontSize(18);
        doc.text(`Observation Table: ${instrument}`, 14, 20);

        doc.setFontSize(11);
        doc.text(`Instrument: ${instrument}`, 14, 30);
        doc.text(`Least Count: ${leastCount} mm`, 14, 36);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 42);

        // Table Data
        // Table Data
        const tableBody = rows.map((row, index) => {
            const total = calculateTotal(row.msr, row.vsc);
            const vsr = (parseFloat(row.vsc) * parseFloat(leastCount)).toFixed(precision + 1); // VSR might need more precision
            return [
                index + 1,
                row.msr || '-',
                row.vsc || '-',
                isNaN(vsr) ? '-' : vsr,
                total
            ];
        });

        const head = [['S.No', 'M.S.R (mm)', `${instrument === 'Micrometer' ? 'H.S.C' : 'V.S.C'} (div)`, 'Fraction (mm)', 'Total Reading (mm)']];

        autoTable(doc, {
            startY: 50,
            head: head,
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: [40, 40, 40] },
            styles: { fontSize: 10, cellPadding: 3 },
        });

        // Footer / Calculation
        // Calculate mean if possible
        const totals = rows.map(r => parseFloat(calculateTotal(r.msr, r.vsc))).filter(n => !isNaN(n));
        if (totals.length > 0) {
            const mean = (totals.reduce((a, b) => a + b, 0) / totals.length).toFixed(precision);
            doc.text(`Mean Reading = ${mean} mm`, 14, doc.lastAutoTable.finalY + 10);
        }

        doc.save(`${instrument.replace(/\s+/g, '_')}_Observations.pdf`);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 pt-6 pb-24 space-y-6">
            <div className="flex items-center mb-4">
                <Link to="/calculators" className="mr-3 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Lab Observation Generator</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Auto-calculate & Export PDF</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Settings Panel */}
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 flex items-center">
                            <FileText size={16} className="mr-2 text-amber-500" /> Setup
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Instrument</label>
                                <select
                                    value={instrument}
                                    onChange={handleInstrumentChange}
                                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-sm p-2 text-sm outline-none focus:border-amber-500 text-slate-900 dark:text-white"
                                >
                                    <option value="Vernier Caliper">Vernier Caliper</option>
                                    <option value="Micrometer">Micrometer</option>
                                    <option value="Height Gauge">Height Gauge</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Least Count (mm)</label>
                                <input
                                    type="number"
                                    value={leastCount}
                                    onChange={(e) => setLeastCount(e.target.value)}
                                    step="0.001"
                                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-sm p-2 text-sm outline-none focus:border-amber-500 font-mono text-slate-900 dark:text-white"
                                />
                            </div>

                            <button
                                onClick={generatePDF}
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-sm text-sm font-bold uppercase tracking-wider flex items-center justify-center transition-colors shadow-sm"
                            >
                                <Download size={16} className="mr-2" /> Download PDF
                            </button>
                        </div>
                    </div>
                </div>

                {/* Data Entry Table */}
                <div className="md:col-span-2">
                    <div className="bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 font-bold">
                                    <tr>
                                        <th className="px-2 py-2 md:px-4 md:py-3">#</th>
                                        <th className="px-2 py-2 md:px-4 md:py-3">M.S.R (mm)</th>
                                        <th className="px-2 py-2 md:px-4 md:py-3">{instrument === 'Micrometer' ? 'H.S.C' : 'V.S.C'} (div)</th>
                                        <th className="px-2 py-2 md:px-4 md:py-3 text-right">Total (mm)</th>
                                        <th className="px-2 py-2 md:px-4 md:py-3 w-8"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {rows.map((row, index) => (
                                        <tr key={index} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-2 py-2 md:px-4 font-mono text-slate-400 text-[10px] md:text-sm">{index + 1}</td>
                                            <td className="px-2 py-2 md:px-4">
                                                <input
                                                    type="number"
                                                    value={row.msr}
                                                    onChange={(e) => handleRowChange(index, 'msr', e.target.value)}
                                                    className="w-16 md:w-20 bg-transparent border-b border-transparent focus:border-amber-500 outline-none font-mono text-slate-900 dark:text-white placeholder:text-slate-300 text-xs md:text-sm"
                                                    placeholder="0"
                                                />
                                            </td>
                                            <td className="px-2 py-2 md:px-4">
                                                <input
                                                    type="number"
                                                    value={row.vsc}
                                                    onChange={(e) => handleRowChange(index, 'vsc', e.target.value)}
                                                    className="w-16 md:w-20 bg-transparent border-b border-transparent focus:border-amber-500 outline-none font-mono text-slate-900 dark:text-white placeholder:text-slate-300 text-xs md:text-sm"
                                                    placeholder="0"
                                                />
                                            </td>
                                            <td className="px-2 py-2 md:px-4 text-right font-mono font-bold text-amber-600 dark:text-amber-500 text-xs md:text-sm">
                                                {calculateTotal(row.msr, row.vsc)}
                                            </td>
                                            <td className="px-2 py-2 md:px-4 text-center">
                                                <button
                                                    onClick={() => deleteRow(index)}
                                                    className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Delete row"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                            <button
                                onClick={addRow}
                                className="text-xs font-bold text-amber-600 dark:text-amber-500 hover:text-amber-700 uppercase tracking-wider flex items-center"
                            >
                                <Plus size={14} className="mr-1" /> Add Reading
                            </button>
                        </div>
                    </div>

                    {/* Quick Formula Hint */}
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-sm border border-blue-100 dark:border-blue-900/20 text-blue-800 dark:text-blue-300 text-xs">
                        <span className="font-bold">Formula:</span> Total Reading = Main Scale Reading + (Coincidence × Least Count)
                    </div>
                </div>
            </div>
        </div>
    );
}
