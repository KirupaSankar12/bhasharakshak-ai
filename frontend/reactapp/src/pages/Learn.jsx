import React from 'react';
import { LanguageGallery } from '../components/LanguageGallery';
import { motion } from 'framer-motion';

export const Learn = () => {
    return (
        <div className="pt-24 pb-12 px-4 container mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center max-w-4xl mx-auto mb-16"
            >
                <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-block px-4 py-1 rounded-full bg-brand-amber/10 text-brand-amber border border-brand-amber/20 font-semibold text-sm mb-4"
                >
                    Knowledge Hub
                </motion.span>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                >
                    Explore Indigenous <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-amber to-brand-teal">Heritage</span>
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-600 leading-relaxed"
                >
                    Discover stories, songs, and knowledge from the diverse linguistic landscape of North-East India.
                    Listen to authentic pronunciations and learn from the community.
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <LanguageGallery />
            </motion.div>
        </div>
    );
};
