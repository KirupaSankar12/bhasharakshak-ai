import React from 'react';
import { AudioRecorder } from '../components/AudioRecorder';
import { motion } from 'framer-motion';
import { Mic, Heart, Users, Sparkles } from 'lucide-react';
import { getContributionCount, getNextBadge } from '../services/GamificationService';

export const Contribute = () => {
    const contributionCount = getContributionCount();
    const nextBadge = getNextBadge();
    return (
        <div className="pt-28 pb-12 px-4 container mx-auto min-h-screen relative">

            {/* Background Decor */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-red-500/10 dark:bg-red-900/10 rounded-full blur-[100px] -z-10 animate-float" />

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16 max-w-4xl mx-auto"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-6 border border-red-100 dark:border-red-800 shadow-sm animate-pulse-glow">
                    <Heart size={14} fill="currentColor" /> Community Powered
                </div>

                {/* Gamification Stats */}
                <div className="mb-8 flex flex-col items-center">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Your Impact</div>
                    <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">{contributionCount} <span className="text-lg font-medium text-gray-400">Contributions</span></div>
                    {nextBadge && (
                        <div className="text-xs text-orange-500 font-bold bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full border border-orange-100 dark:border-orange-800">
                            Next Badge: {nextBadge.name} ({nextBadge.min - contributionCount} to go)
                        </div>
                    )}
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                    Donate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Voice</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Help us build the largest digital repository of indigenous languages.
                    Every recording preserves a piece of history for future generations.
                </p>

                {/* Stats Row */}
                <div className="flex justify-center gap-8 mt-10">
                    <div className="text-center">
                        <div className="text-2xl font-black text-gray-900 dark:text-white">120+</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Languages</div>
                    </div>
                    <div className="w-px h-10 bg-gray-200 dark:bg-gray-700" />
                    <div className="text-center">
                        <div className="text-2xl font-black text-gray-900 dark:text-white">50k+</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recordings</div>
                    </div>
                    <div className="w-px h-10 bg-gray-200 dark:bg-gray-700" />
                    <div className="text-center">
                        <div className="text-2xl font-black text-gray-900 dark:text-white">10k+</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contributors</div>
                    </div>
                </div>
            </motion.div>

            {/* Recorder Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative z-10"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 rounded-[3rem] blur-2xl opacity-20 dark:opacity-10 transform translate-y-4"></div>
                <div className="glass-card p-1 rounded-[2.5rem] overflow-hidden relative shadow-2xl dark:shadow-black/50">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500" />
                    <div className="p-8 md:p-12 dark:bg-gray-900/80">
                        <AudioRecorder />
                    </div>
                </div>
            </motion.div>

            {/* Features / Motivation Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-20">
                {[
                    { icon: Mic, title: "Record", desc: "Read the prompt and record your voice in your native dialect." },
                    { icon: Users, title: "Review", desc: "Community members verify recordings for accuracy." },
                    { icon: Sparkles, title: "Reward", desc: "Earn badges and recognition for your contributions." }
                ].map((item, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                        key={i}
                        className="p-8 rounded-3xl bg-white/50 dark:bg-gray-800/50 border border-white/50 dark:border-white/5 text-center hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="w-14 h-14 mx-auto bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-4 text-gray-900 dark:text-white">
                            <item.icon size={24} />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
