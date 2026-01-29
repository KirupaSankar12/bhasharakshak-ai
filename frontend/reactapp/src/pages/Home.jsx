import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mic, Globe, BookOpen, ArrowRight, PlayCircle, Heart } from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

import { ImpactDashboard } from '../components/ImpactDashboard';
import { LinguisticMap } from '../components/LinguisticMap';

const Home = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-[120px] -z-10 animate-float" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] -z-10 animate-float" style={{ animationDelay: '2s' }} />

            <div className="container mx-auto">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="text-center max-w-5xl mx-auto"
                >
                    <motion.div variants={item} className="mb-8 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white dark:bg-gray-800 border border-orange-100 dark:border-gray-700 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        <span className="text-orange-600 dark:text-orange-400 font-bold text-xs md:text-sm tracking-wide uppercase">
                            Preserving India's Linguistic Heritage
                        </span>
                    </motion.div>

                    <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight text-gray-900 dark:text-white leading-[0.9]">
                        Give Voice to <br />
                        <span className="text-gradient">Every Dialect</span>
                    </motion.h1>

                    <motion.p variants={item} className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                        Join the movement to digitize and empower indigenous languages. Record your voice, translate content, and help AI learn our heritage.
                    </motion.p>

                    <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/contribute" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 group">
                            <Mic size={24} className="group-hover:scale-110 transition-transform" />
                            <span>Donate Voice</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/learn" className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-3 group">
                            <PlayCircle size={24} className="text-gray-400 dark:text-gray-400 group-hover:text-orange-500 transition-colors" />
                            <span>Explore Assets</span>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Dashboard Section */}
                <ImpactDashboard />

                {/* Map Section */}
                <LinguisticMap />

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-3 gap-8 mt-32"
                >
                    {[
                        { icon: Mic, title: 'Digitize', desc: 'Donate your voice to build open datasets for low-resource languages.', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
                        { icon: Globe, title: 'Translate', desc: 'Use AI to translate content between indigenous languages and English.', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                        { icon: BookOpen, title: 'Empower', desc: 'Access educational resources and verified translations freely.', color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20' }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            className="glass-card p-10 relative group"
                        >
                            <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                <feature.icon size={32} className={feature.color} />
                            </div>
                            <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{feature.desc}</p>

                            <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-10 transition-opacity">
                                <feature.icon size={100} className="dark:text-white" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer-ish prompt */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 text-center pb-20"
                >
                    <p className="text-gray-400 font-medium flex items-center justify-center gap-2">
                        Made with <Heart size={20} className="text-red-500 fill-current animate-pulse-glow" /> for India
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
