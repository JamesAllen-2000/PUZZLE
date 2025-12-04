import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const TextReveal = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
                delayChildren: 1.5,
                duration: 3,
                delay: 2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.5, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 10,
                duration: 0.5
            }
        }
    };

    // Generate random glitter particles
    const sparkles = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() * 3 + 2,
            delay: Math.random() * 5,
            duration: Math.random() * 0.5 + 0.5
        }));
    }, []);

    // Manual Configuration for Text Placement and Sizing
    const textConfig = {
        line1: {
            text: "Piece by Piece",
            top: "30%", // Adjust vertical position
            left: "1%", // Adjust horizontal position
            fontSize: "9rem", // Adjust size
            letterSpacing: "0.05em"
        },
        line2: {
            text: "Gods Perfect Plan",
            top: "50%", // Adjust vertical position
            left: "1%", // Adjust horizontal position
            fontSize: "6rem", // Adjust size
            letterSpacing: "0.15em"
        }
    };

    return (
        <motion.div
            className="text-reveal-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 3000,
                pointerEvents: 'none',
                fontFamily: "'Bebas Neue', sans-serif",
                textAlign: 'center',
                // Background blur and overlay
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(1.5px)',
                WebkitBackdropFilter: 'blur(1.5px)'
            }}
        >
            {/* Glitter Particles */}
            {sparkles.map((s) => (
                <motion.div
                    key={s.id}
                    style={{
                        position: 'absolute',
                        top: `${s.top}%`,
                        left: `${s.left}%`,
                        width: s.size,
                        height: s.size,
                        backgroundColor: '#FFD700',
                        borderRadius: '50%',
                        boxShadow: '0 0 4px #FFF, 0 0 8px #FFD700',
                        zIndex: 3001
                    }}
                    animate={{
                        opacity: [0, 3, 0],
                        scale: [0, 1, 0]
                    }}
                    transition={{
                        duration: s.duration,
                        repeat: Infinity,
                        delay: s.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}

            <motion.h1
                variants={itemVariants}
                style={{
                    position: 'absolute',
                    top: textConfig.line1.top,
                    left: textConfig.line1.left,
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    fontSize: textConfig.line1.fontSize,
                    fontWeight: '400', // Bebas Neue is usually 400
                    margin: 0,
                    color: '#fafcceff', // Solid white text
                    // Enhanced Glow
                    filter: 'drop-shadow(0 0 15px rgba(242, 248, 86, 0.8)) drop-shadow(0 0 30px rgba(255, 165, 0, 0.6))',
                    letterSpacing: textConfig.line1.letterSpacing,
                    textTransform: 'uppercase',
                    zIndex: 3002
                }}
            >
                {textConfig.line1.text}
            </motion.h1>

            <motion.h2
                variants={itemVariants}
                transition={{
                    type: "spring",
                    stiffness: 20,
                    damping: 10,
                    duration: 10,
                    delay: 5 // Extra delay for the second line
                }}
                style={{
                    position: 'absolute',
                    top: textConfig.line2.top,
                    left: textConfig.line2.left,
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    fontSize: textConfig.line2.fontSize,
                    fontWeight: '400',
                    margin: 0,
                    color: '#fafcceff', // Solid white text
                    // Enhanced Glow
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 20px rgba(255, 140, 0, 0.4))',
                    letterSpacing: textConfig.line2.letterSpacing,
                    textTransform: 'uppercase',
                    zIndex: 3002
                }}
            >
                {textConfig.line2.text}
            </motion.h2>
        </motion.div>
    );
};

export default TextReveal;
