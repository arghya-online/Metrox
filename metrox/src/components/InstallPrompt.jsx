import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl p-6 max-w-sm w-full relative overflow-hidden">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center mb-4 text-amber-600 dark:text-amber-500">
                        <Download size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Install App</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                        Add <span className="font-bold text-slate-700 dark:text-slate-300">Metrox</span> to your home screen for offline access and a fullscreen experience.
                    </p>

                    <button
                        onClick={handleInstall}
                        className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-amber-500 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/20"
                    >
                        Install Now
                    </button>
                </div>
            </div>
        </div>
    );
}
