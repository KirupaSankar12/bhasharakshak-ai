import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mic, Globe, BookOpen, Home, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { getBadges } from '../services/GamificationService';

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const badges = getBadges();
    const topBadge = badges.length > 0 ? badges[badges.length - 1] : null;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/contribute', label: 'Contribute', icon: Mic },
        { path: '/translate', label: 'Translate', icon: Globe },
        { path: '/learn', label: 'Learn', icon: BookOpen },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'glass h-16 md:h-20 my-2 mx-4 md:my-4 md:mx-6 rounded-2xl shadow-2xl dark:shadow-black/50' : 'h-24 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                        <Sparkles size={20} fill="currentColor" />
                    </div>
                    <div>
                        <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 block leading-none">
                            BhashaRakshak
                        </span>
                        <span className="text-[10px] md:text-xs font-semibold text-orange-500 tracking-widest uppercase">
                            AI for All
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-1">
                    {navItems.map(({ path, label, icon: Icon }) => (
                        <Link
                            key={path}
                            to={path}
                            className={`relative px-6 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 group ${isActive(path)
                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10 hover:text-orange-600'
                                }`}
                        >
                            <Icon size={18} className={`transition-transform duration-300 ${!isActive(path) && 'group-hover:scale-110'}`} />
                            <span className="font-medium">{label}</span>
                            {isActive(path) && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute inset-0 rounded-xl bg-gray-900 dark:bg-white -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </Link>
                    ))}

                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2" />

                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-yellow-400 hover:scale-110 transition-transform"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {topBadge && (
                        <div className="ml-3 hidden md:flex items-center gap-2 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-full border border-yellow-200 dark:border-yellow-700/50" title={topBadge.name}>
                            <span className="text-lg">{topBadge.icon}</span>
                            <span className="text-xs font-bold uppercase tracking-wide">{topBadge.name}</span>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden w-10 h-10 flex items-center justify-center bg-white/50 dark:bg-black/50 rounded-xl text-gray-800 dark:text-white active:scale-95 transition-all"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 glass rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-white/10 dark:bg-gray-900/90"
                    >
                        <div className="flex flex-col p-4 space-y-2">
                            <div className="flex justify-end p-2 gap-2">
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center gap-2 text-sm font-bold dark:text-white"
                                >
                                    {theme === 'dark' ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
                                </button>
                            </div>

                            {navItems.map(({ path, label, icon: Icon }) => (
                                <Link
                                    key={path}
                                    to={path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${isActive(path)
                                        ? 'bg-orange-50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive(path) ? 'bg-orange-100 dark:bg-orange-500/20' : 'bg-gray-100 dark:bg-white/10'}`}>
                                        <Icon size={20} />
                                    </div>
                                    <span className="text-lg">{label}</span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
