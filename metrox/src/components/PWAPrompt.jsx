import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

export default function PWAPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Show the prompt
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsVisible(false);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setIsVisible(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-auto md:right-6 z-50 animate-slide-up">
            <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg shadow-2xl p-4 flex items-center justify-between max-w-sm mx-auto md:max-w-md border border-slate-700 dark:border-slate-200">
                <div className="flex items-center">
                    <div className="bg-slate-800 dark:bg-slate-100 p-2 rounded-md mr-3">
                        <Smartphone size={24} className="text-amber-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Install Metrox App</h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Get the full offline experience.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-slate-400 hover:text-white dark:text-slate-500 dark:hover:text-slate-900 transition-colors"
                    >
                        <X size={18} />
                    </button>
                    <button
                        onClick={handleInstallClick}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors flex items-center"
                    >
                        <Download size={14} className="mr-1.5" />
                        Install
                    </button>
                </div>
            </div>
        </div>
    );
}
