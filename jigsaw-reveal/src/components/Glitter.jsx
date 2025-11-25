import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Glitter = ({ imageSrc, width, height, scaleAdjustment }) => {
    // Generate random particles
    const particles = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() * 3 + 1, // 1px to 4px
            delay: Math.random() * 2,
            duration: Math.random() * 1 + 0.5
        }));
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 10, // Above the image
                // Masking magic: use the piece image as a mask
                maskImage: `url(${imageSrc})`,
                WebkitMaskImage: `url(${imageSrc})`,
                maskSize: '100% 100%',
                WebkitMaskSize: '100% 100%',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                // Apply the same transform as the image to match shape exactly
                transform: `scale(${scaleAdjustment.scaleX}, ${scaleAdjustment.scaleY})`,
                transformOrigin: 'center'
            }}
        >
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        top: `${p.top}%`,
                        left: `${p.left}%`,
                        width: p.size,
                        height: p.size,
                        backgroundColor: '#FFD700', // Gold
                        borderRadius: '50%',
                        boxShadow: '0 0 4px #FFF', // White glow
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

export default Glitter;
