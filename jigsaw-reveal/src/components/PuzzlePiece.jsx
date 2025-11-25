import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const PuzzlePiece = ({
    index,
    row,
    col,
    width,
    height,
    imageSrc,
    isRevealed,
    bounds,
    positionAdjustment = { offsetX: 0, offsetY: 0 },
    scaleAdjustment = { scaleX: 1.0, scaleY: 1.0 }
}) => {
    const hasFiredConfetti = useRef(false);

    useEffect(() => {
        if (isRevealed && !hasFiredConfetti.current) {
            const el = document.getElementById(`piece-${index}`);
            if (el) {
                const rect = el.getBoundingClientRect();
                const x = (rect.left + rect.width / 2) / window.innerWidth;
                const y = (rect.top + rect.height / 2) / window.innerHeight;
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { x, y },
                    colors: ['#FFD700', '#FFFFFF', '#FFA500'],
                    disableForReducedMotion: true,
                    zIndex: 1000,
                });
            }
            hasFiredConfetti.current = true;
        } else if (!isRevealed) {
            hasFiredConfetti.current = false;
        }
    }, [isRevealed, index]);

    // Random start position
    const randomValues = useRef({
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 500,
        z: 500 + Math.random() * 500,
        rx: (Math.random() - 0.5) * 180,
        ry: (Math.random() - 0.5) * 180
    }).current;

    // Calculate exact container size and position based on bounds
    // bounds are normalized to grid cell (0..1)
    // e.g. minX = -0.3, maxX = 1.3
    // width = (maxX - minX) * cellWidth
    const containerWidth = (bounds.maxX - bounds.minX) * width;
    const containerHeight = (bounds.maxY - bounds.minY) * height;

    // Position relative to the grid cell top-left (0,0)
    // The image starts at bounds.minX relative to the grid cell
    // So left = col*width + bounds.minX*width
    // Apply manual position adjustment (percentage-based, scales with puzzle size)
    const left = (col * width) + (bounds.minX * width) + (positionAdjustment.offsetX * width);
    const top = (row * height) + (bounds.minY * height) + (positionAdjustment.offsetY * height);

    return (
        <div
            style={{
                position: 'absolute',
                left: left,
                top: top,
                width: containerWidth,
                height: containerHeight,
                zIndex: isRevealed ? 1 : 100,
                perspective: 1000,
                pointerEvents: 'none'
            }}
        >
            <motion.div
                id={`piece-${index}`}
                initial={{
                    opacity: 0,
                    x: randomValues.x,
                    y: randomValues.y,
                    z: randomValues.z,
                    rotateX: randomValues.rx,
                    rotateY: randomValues.ry
                }}
                animate={isRevealed ? {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    z: 0,
                    rotateX: 0,
                    rotateY: 0
                } : {
                    opacity: 0,
                    x: randomValues.x,
                    y: randomValues.y,
                    z: randomValues.z,
                    rotateX: randomValues.rx,
                    rotateY: randomValues.ry
                }}
                transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1.5 }}
                style={{
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* The Pre-cut Image */}
                <img
                    src={imageSrc}
                    alt={`Piece ${row}-${col}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        // We use fill because we calculated the exact container size
                        objectFit: 'fill',
                        filter: isRevealed ? 'drop-shadow(0 0 2px rgba(255, 215, 0, 0.5))' : 'none',
                        transform: `scale(${scaleAdjustment.scaleX}, ${scaleAdjustment.scaleY})`,
                        transformOrigin: 'center'
                    }}
                />

                {isRevealed && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                            zIndex: 2
                        }}
                    />
                )}
            </motion.div>
        </div>
    );
};

export default PuzzlePiece;
