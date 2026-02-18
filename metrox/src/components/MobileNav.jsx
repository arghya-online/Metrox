import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Calculator, BarChart2, Library, Search } from 'lucide-react';

export default function MobileNav({ onSearchClick }) {
    const navItems = [
        { to: "/", icon: Home, label: "Home" },
        { to: "/calculators", icon: Calculator, label: "Tools" },
        { to: "/analysis", icon: BarChart2, label: "Analyze" },
        { to: "/reference", icon: Library, label: "Standards" },
        { to: "/theory", icon: BookOpen, label: "Theory" },
    ];

    return (
        <>
            <div className="fixed bottom-20 right-4 z-50">
                <button
                    onClick={onSearchClick}
                    className="bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-transform hover:scale-105 active:scale-95"
                >
                    <Search size={24} />
                </button>
            </div>

            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 pb-safe z-40 transition-colors duration-300">
                <div className="flex justify-around items-center h-16">
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `
                  flex flex-col items-center justify-center w-full h-full space-y-1
                  ${isActive
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'}
                  transition-colors
                `}
                        >
                            <Icon size={24} strokeWidth={2} />
                            <span className="text-[10px] font-medium">{label}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>
        </>
    );
}
