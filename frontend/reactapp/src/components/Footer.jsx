import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                                <Sparkles size={20} fill="currentColor" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                                BhashaRakshak
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                            Preserving indigenous languages through the power of Community and AI. Join the movement today.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Platform</h4>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li><Link to="/translate" className="hover:text-orange-500 transition-colors">Translate & Verify</Link></li>
                            <li><Link to="/contribute" className="hover:text-orange-500 transition-colors">Donate Voice</Link></li>
                            <li><Link to="/learn" className="hover:text-orange-500 transition-colors">Language Gallery</Link></li>
                            <li><Link to="/" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Community</h4>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Guidelines</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Leaderboard</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Partners</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">API Access</a></li>
                        </ul>
                    </div>

                    {/* Newsletter / Social */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Connect</h4>
                        <div className="flex gap-4 mb-6">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-orange-500 hover:text-white transition-all transform hover:scale-110">
                                <Github size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-400 hover:text-white transition-all transform hover:scale-110">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-700 hover:text-white transition-all transform hover:scale-110">
                                <Linkedin size={18} />
                            </a>
                        </div>
                        <p className="text-xs text-gray-400">
                            © 2024 BhashaRakshak AI. <br /> Open Source Initiative.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
                    <p>Privacy Policy • Terms of Service</p>
                    <p className="flex items-center gap-1">
                        Made with <Heart size={12} className="text-red-500 fill-current animate-pulse" /> in India
                    </p>
                </div>
            </div>
        </footer>
    );
};
