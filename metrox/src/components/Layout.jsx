import React from 'react';
import { Outlet } from 'react-router-dom';
import MobileNav from './MobileNav';
import InstallPrompt from './InstallPrompt';
import SearchModal from './SearchModal';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function Layout() {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300 pb-20 md:pb-0">
            <InstallPrompt />
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            <main className="w-full mx-auto md:max-w-md lg:max-w-lg xl:max-w-2xl min-h-screen bg-white dark:bg-neutral-900 shadow-xl border-x border-neutral-100 dark:border-neutral-800">
                <Outlet />
            </main>

            {/* Floating Dark Mode Toggle */}
            <ThemeToggle />

            <MobileNav onSearchClick={() => setIsSearchOpen(true)} />
        </div>
    );
}

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md shadow-lg border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-yellow-400 transition-all hover:scale-110 active:scale-95"
            aria-label="Toggle Dark Mode"
        >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}
