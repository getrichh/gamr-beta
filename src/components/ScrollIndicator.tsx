"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollIndicator() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHidden(true); // Скрываем при первом скролле
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (hidden) return null;

    return (
        <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
        >
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </motion.div>
        </motion.div>
    );
}