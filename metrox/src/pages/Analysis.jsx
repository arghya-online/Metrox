import { useState, useMemo, useEffect } from 'react';
import { Plus, Trash2, RotateCcw, Save, FileText, AlertTriangle, CheckCircle, BarChart as BarChartIcon, Activity, Download } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid, Cell } from 'recharts';
import { useLocation } from 'react-router-dom';
import { useSessions } from '../hooks/useSessions';
import clsx from 'clsx';
import { calculateStatistics, createHistogramData } from '../utils/statistics';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Analysis() {
    const [readings, setReadings] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [targetValue, setTargetValue] = useState(''); // Nominal
    const [tolerance, setTolerance] = useState(''); // Total Tolerance (symmetric)
    const [viewMode, setViewMode] = useState('chart'); // 'chart' | 'histogram'
    const location = useLocation();
    const { saveSession } = useSessions();
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (location.state?.readings) {
            setReadings(location.state.readings);
            if (location.state.targetValue) setTargetValue(location.state.targetValue);
        }
    }, [location.state]);

    const handleSave = () => {
        if (readings.length === 0) return;
        saveSession({
            readings,
            targetValue,
            tolerance,
            title: `Log ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        });
        setMsg('Data Saved');
        setTimeout(() => setMsg(''), 2000);
    };

    const handleExportCSV = () => {
        if (readings.length === 0) return;
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Index,Reading,Deviation\n"
            + readings.map((r, i) => `${i + 1},${r},${(r - (stats?.mean || 0)).toFixed(4)}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `metrox_data_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportPDF = () => {
        if (readings.length === 0) return;
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Metrox - Process Analysis Report", 14, 20);

        doc.setFontSize(10);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
        doc.text(`Total Samples: ${stats.n}`, 14, 35);
        doc.text(`Mean: ${stats.mean}`, 80, 35);
        doc.text(`Sigma: ${stats.sd}`, 140, 35);

        if (stats.cp) {
            doc.text(`Cp: ${stats.cp.toFixed(2)}`, 14, 45);
            doc.text(`Cpk: ${stats.cpk.toFixed(2)}`, 80, 45);
        }

        const tableData = readings.map((r, i) => [i + 1, r, (r - stats.mean).toFixed(4)]);

        autoTable(doc, {
            startY: 55,
            head: [['#', 'Reading', 'Deviation']],
            body: tableData,
        });

        doc.save(`metrox_report_${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    const addReading = (e) => {
        e.preventDefault();
        const val = parseFloat(inputValue);
        if (!isNaN(val)) {
            setReadings([...readings, val]);
            setInputValue('');
        }
    };

    const removeReading = (index) => {
        setReadings(readings.filter((_, i) => i !== index));
    };

    const clearAll = () => {
        setReadings([]);
        setTargetValue('');
        setTolerance('');
    };

    const stats = useMemo(() => {
        return calculateStatistics(readings, targetValue, tolerance);
    }, [readings, targetValue, tolerance]);

    const chartData = readings.map((val, idx) => ({ i: idx + 1, value: val }));
    const histogramData = useMemo(() => createHistogramData(readings), [readings]);

    // Custom Tooltip for Chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900 text-white p-2 rounded-sm text-xs shadow-xl border border-slate-700">
                    <p className="font-mono mb-1 text-slate-400">Sample #{label}</p>
                    <p className="font-bold text-lg font-mono text-amber-500">{payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="max-w-3xl mx-auto p-4 pt-6 pb-24 space-y-6">
            <header className="flex justify-between items-start mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Data Analysis</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 tracking-wider">PROCESS CONTROL DASHBOARD</p>
                </div>
                <div className="flex gap-2">
                    {msg && <span className="text-xs text-emerald-600 font-bold px-2 py-1 bg-emerald-100 rounded animate-pulse">{msg}</span>}
                    {readings.length > 0 && (
                        <>
                            <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
                                <button onClick={handleSave} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors" title="Save Session">
                                    <Save size={18} />
                                </button>
                                <div className="w-[1px] bg-slate-200 dark:bg-slate-800"></div>
                                <button onClick={handleExportPDF} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors" title="Export PDF">
                                    <FileText size={18} />
                                </button>
                                <button onClick={handleExportCSV} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors" title="Export CSV">
                                    <Download size={18} />
                                </button>
                                <div className="w-[1px] bg-slate-200 dark:bg-slate-800"></div>
                                <button onClick={clearAll} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors" title="Clear All">
                                    <RotateCcw size={18} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </header>

            {/* Input Section - Clean UI */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-sm shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Target (Nominal)</label>
                            <input
                                type="number"
                                placeholder="e.g. 10.00"
                                className="w-full bg-slate-50 dark:bg-black text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 p-2 text-sm rounded-sm outline-none focus:border-amber-500 transition-colors font-mono font-bold"
                                value={targetValue}
                                onChange={(e) => setTargetValue(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Unilateral Tolerance</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-slate-400 text-sm font-mono">±</span>
                                <input
                                    type="number"
                                    placeholder="e.g. 0.05"
                                    className="w-full bg-slate-50 dark:bg-black text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 p-2 pl-7 text-sm rounded-sm outline-none focus:border-amber-500 transition-colors font-mono font-bold"
                                    value={tolerance}
                                    onChange={(e) => setTolerance(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 flex flex-col justify-end">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">New Reading</label>
                        <form onSubmit={addReading} className="flex relative items-center gap-2">
                            <input
                                type="number"
                                step="any"
                                className="w-full bg-slate-50 dark:bg-black text-slate-900 dark:text-white p-3 border border-slate-200 dark:border-slate-800 rounded-sm text-xl font-mono outline-none focus:border-amber-500 transition-all font-bold tracking-wider"
                                placeholder="Enter measured value..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={!inputValue}
                                className="h-full aspect-square bg-amber-600 text-white rounded-sm disabled:opacity-30 hover:bg-amber-500 transition-colors flex items-center justify-center shadow-sm"
                            >
                                <Plus size={24} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Primary Analysis View */}
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-sm shadow-sm relative overflow-hidden group">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Mean (X̄)</p>
                        <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">{stats.mean}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-sm shadow-sm relative overflow-hidden group">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Sigma (σ)</p>
                        <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">{stats.sd}</p>
                    </div>
                    {/* Process Capability showing if Target/Tol is set */}
                    {stats.cpk !== null ? (
                        <div className={clsx(
                            "bg-white dark:bg-slate-900 p-4 border rounded-sm shadow-sm relative overflow-hidden group",
                            stats.cpk < 1.33 ? "border-red-200 dark:border-red-900/50" : "border-emerald-200 dark:border-emerald-900/50"
                        )}>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 flex justify-between">
                                <span>Cpk Index</span>
                                <span className={stats.cpk < 1.33 ? "text-red-500" : "text-emerald-500"}>
                                    {stats.cpk < 1.33 ? "Low" : "Good"}
                                </span>
                            </p>
                            <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{stats.cpk.toFixed(2)}</p>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-sm shadow-sm relative overflow-hidden group">
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Range (R)</p>
                            <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">{stats.range}</p>
                        </div>
                    )}

                    <div className={clsx(
                        "p-4 border rounded-sm shadow-sm relative overflow-hidden",
                        stats.outOfSpec > 0
                            ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900"
                            : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900"
                    )}>
                        <p className={clsx("text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center", stats.outOfSpec > 0 ? "text-red-700 dark:text-red-400" : "text-emerald-700 dark:text-emerald-400")}>
                            {stats.outOfSpec > 0 ? <AlertTriangle size={10} className="mr-1" /> : <CheckCircle size={10} className="mr-1" />}
                            {stats.outOfSpec > 0 ? "Out of Spec" : "Status"}
                        </p>
                        <p className={clsx("text-2xl font-mono font-bold", stats.outOfSpec > 0 ? "text-red-900 dark:text-red-200" : "text-emerald-900 dark:text-emerald-200")}>
                            {stats.outOfSpec > 0 ? `${stats.outOfSpec} Fail` : "PASS"}
                        </p>
                    </div>
                </div>
            )}

            {/* Chart Section */}
            {readings.length > 1 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-4 shadow-sm h-80 animate-fade-in relative flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('chart')}
                                className={clsx(
                                    "px-3 py-1 text-[10px] uppercase font-bold rounded-md transition-all flex items-center",
                                    viewMode === 'chart'
                                        ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
                                )}
                            >
                                <Activity size={12} className="mr-1" /> Run Chart
                            </button>
                            <button
                                onClick={() => setViewMode('histogram')}
                                className={clsx(
                                    "px-3 py-1 text-[10px] uppercase font-bold rounded-md transition-all flex items-center",
                                    viewMode === 'histogram'
                                        ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
                                )}
                            >
                                <BarChartIcon size={12} className="mr-1" /> Histogram
                            </button>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex items-center text-[10px] text-slate-500">
                                <span className="w-2 h-2 rounded-full bg-amber-500/50 mr-1"></span> {viewMode === 'chart' ? 'Trend' : 'Count'}
                            </div>
                            {stats.upperLimit && (
                                <div className="flex items-center text-[10px] text-slate-500">
                                    <span className="w-2 h-2 rounded-full bg-red-500/50 mr-1"></span> Limits
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            {viewMode === 'chart' ? (
                                <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                                    <XAxis dataKey="i" hide />
                                    <YAxis
                                        domain={['auto', 'auto']}
                                        fontSize={10}
                                        tickFormatter={(val) => val.toFixed(2)}
                                        width={40}
                                        tick={{ fill: '#94a3b8' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '3 3' }} />

                                    {/* Mean Line */}
                                    <ReferenceLine y={parseFloat(stats.mean)} stroke="#64748b" strokeDasharray="5 5" />

                                    {/* Spec Limits */}
                                    {stats.upperLimit && (
                                        <ReferenceLine y={stats.upperLimit} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: 'USL', fontSize: 8, fill: '#ef4444' }} />
                                    )}
                                    {stats.lowerLimit && (
                                        <ReferenceLine y={stats.lowerLimit} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: 'LSL', fontSize: 8, fill: '#ef4444' }} />
                                    )}

                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#f59e0b"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorVal)"
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
                                    />
                                </AreaChart>
                            ) : (
                                <BarChart data={histogramData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                                    <XAxis
                                        dataKey="label"
                                        fontSize={10}
                                        tick={{ fill: '#94a3b8' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        fontSize={10}
                                        width={30}
                                        tick={{ fill: '#94a3b8' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                                    />
                                    <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]}>
                                        {histogramData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill="#f59e0b" />
                                        ))}
                                    </Bar>

                                    {/* Visualize Limits on Histogram if applicable - tricky in recharts BarChart without custom shapes, skipping for simplicity in V1 */}
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Data Table */}
            {readings.length > 0 && (
                <div className="animate-fade-in-up">
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 px-1">Detailed Log</h3>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
                        <div className="max-h-60 overflow-y-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 dark:bg-black sticky top-0 z-10">
                                    <tr>
                                        <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">#</th>
                                        <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-full">Reading</th>
                                        <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Dev</th>
                                        <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {readings.map((val, idx) => {
                                        const mean = parseFloat(stats.mean);
                                        const dev = val - mean;
                                        const isOut = stats.upperLimit && (val > stats.upperLimit || val < stats.lowerLimit);

                                        return (
                                            <tr key={idx} className={clsx("group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors", isOut && "bg-red-50/50 dark:bg-red-900/10")}>
                                                <td className="p-3 text-xs font-mono text-slate-400">{idx + 1}</td>
                                                <td className="p-3">
                                                    <span className={clsx("font-mono text-sm font-bold", isOut ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-white")}>
                                                        {val.toFixed(4)}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-right">
                                                    <span className={clsx("text-xs font-mono", dev > 0 ? "text-emerald-500" : "text-red-500")}>
                                                        {dev > 0 ? '+' : ''}{dev.toFixed(3)}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <button onClick={() => removeReading(idx)} className="text-slate-300 hover:text-red-500 transition-colors">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* How to Use Guide */}
            <div className="bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 mt-8">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                    How to use this tool
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 dark:text-slate-400">
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-300 mb-2">1. Setup Parameters</h4>
                        <ul className="list-disc list-inside space-y-1 ml-1">
                            <li><strong>Target (Nominal):</strong> The ideal value from your drawing (e.g. 20.00 mm).</li>
                            <li><strong>Tolerance (±):</strong> The allowable deviation. If drawing says 20.00 ± 0.05, enter <strong>0.05</strong>.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-300 mb-2">2. Analyze & Export</h4>
                        <ul className="list-disc list-inside space-y-1 ml-1">
                            <li>Enter readings one by one in the <strong>New Reading</strong> box.</li>
                            <li><strong>Cp/Cpk:</strong> Indicators of process capability. &gt;1.33 is good.</li>
                            <li>Use <strong>Run Chart</strong> to see trends over time.</li>
                            <li>Use <strong>Histogram</strong> to see distribution (bell curve).</li>
                            <li>Click <strong>PDF</strong> to download a formal report.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
