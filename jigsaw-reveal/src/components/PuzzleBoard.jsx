import React, { useState, useEffect } from 'react';
import PuzzlePiece from './PuzzlePiece';
import { PIECE_POSITION_ADJUSTMENTS, PIECE_SCALE_ADJUSTMENTS } from '../config/piecePositions';

// Import all piece images
import p1 from '../assets/pieces/1.png';
import p2 from '../assets/pieces/2.png';
import p3 from '../assets/pieces/3.png';
import p4 from '../assets/pieces/4.png';
import p5 from '../assets/pieces/5.png';
import p6 from '../assets/pieces/6.png';
import p7 from '../assets/pieces/7.png';
import p8 from '../assets/pieces/8.png';
import p9 from '../assets/pieces/9.png';
import p10 from '../assets/pieces/10.png';

const PIECE_IMAGES = [
    [p1, p2, p3, p4, p5],
    [p6, p7, p8, p9, p10]
];

// Hardcoded bounds for each piece (minX, minY, maxX, maxY) relative to grid cell
// Generated from SVG paths
const PIECE_BOUNDS = [
    // Row 0
    [
        { minX: 0.0, minY: 0.0, maxX: 1.3962, maxY: 1.346 },
        { minX: -0.0218, minY: 0.0, maxX: 1.3609, maxY: 1.3775 },
        { minX: -0.0253, minY: 0.0, maxX: 1.0996, maxY: 1.4014 },
        { minX: -0.0996, minY: 0.0, maxX: 1.3865, maxY: 1.3632 },
        { minX: -0.0163, minY: 0.0, maxX: 1.0, maxY: 1.35 }
    ],
    // Row 1
    [
        { minX: 0.0, minY: -0.346, maxX: 1.1, maxY: 1.0 },
        { minX: -0.0218, minY: -0.3775, maxX: 1.3959, maxY: 1.0 },
        { minX: -0.0253, minY: -0.4014, maxX: 1.3742, maxY: 1.0 },
        { minX: -0.1135, minY: -0.3932, maxX: 1.1126, maxY: 1.0 },
        { minX: -0.1052, minY: -0.3214, maxX: 1.0, maxY: 1.0 }
    ]
];

const PuzzleBoard = ({ revealedPieces, imageSrc }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0, pieceWidth: 0, pieceHeight: 0 });
    const [debugMode, setDebugMode] = useState(false); // Set to true to show debug info

    const ROWS = 2;
    const COLS = 5;

    useEffect(() => {
        const updateDimensions = () => {
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const targetW = screenW * 0.9;
            const targetH = screenH * 0.9;

            const img = new Image();
            img.src = imageSrc;

            img.onload = () => {
                console.log("Image loaded successfully:", img.width, img.height);
                const imgRatio = img.width / img.height;
                const screenRatio = targetW / targetH;

                let finalW, finalH;

                if (screenRatio > imgRatio) {
                    finalH = targetH;
                    finalW = finalH * imgRatio;
                } else {
                    finalW = targetW;
                    finalH = finalW / imgRatio;
                }

                console.log("Calculated dimensions:", { finalW, finalH });

                setDimensions({
                    width: finalW,
                    height: finalH,
                    pieceWidth: finalW / COLS,
                    pieceHeight: finalH / ROWS
                });
            };

            img.onerror = (e) => {
                console.error("Error loading image:", e);
                setDimensions({
                    width: targetW,
                    height: targetH,
                    pieceWidth: targetW / COLS,
                    pieceHeight: targetH / ROWS
                });
            };
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        return () => window.removeEventListener('resize', updateDimensions);
    }, [imageSrc]);

    if (dimensions.width === 0) return null;

    const pieces = [];
    let index = 0;

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            pieces.push(
                <PuzzlePiece
                    key={`${r}-${c}`}
                    index={index}
                    row={r}
                    col={c}
                    width={dimensions.pieceWidth}
                    height={dimensions.pieceHeight}
                    imageSrc={PIECE_IMAGES[r][c]}
                    isRevealed={revealedPieces[index]}
                    bounds={PIECE_BOUNDS[r][c]}
                    positionAdjustment={PIECE_POSITION_ADJUSTMENTS[r][c]}
                    scaleAdjustment={PIECE_SCALE_ADJUSTMENTS[r][c]}
                />
            );
            index++;
        }
    }

    return (
        <div
            style={{
                width: dimensions.width,
                height: dimensions.height,
                position: 'relative',
            }}
        >
            {/* Debug Grid Overlay */}
            {debugMode && (
                <>
                    {Array.from({ length: ROWS + 1 }).map((_, r) => (
                        <div
                            key={`hline-${r}`}
                            style={{
                                position: 'absolute',
                                top: r * dimensions.pieceHeight,
                                left: 0,
                                width: '100%',
                                height: '1px',
                                backgroundColor: 'red',
                                opacity: 0.5,
                                zIndex: 500
                            }}
                        />
                    ))}
                    {Array.from({ length: COLS + 1 }).map((_, c) => (
                        <div
                            key={`vline-${c}`}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: c * dimensions.pieceWidth,
                                width: '1px',
                                height: '100%',
                                backgroundColor: 'red',
                                opacity: 0.5,
                                zIndex: 500
                            }}
                        />
                    ))}
                </>
            )}

            {pieces}

            {/* Debug: Piece Numbers */}
            {debugMode && Array.from({ length: 10 }).map((_, i) => {
                const r = Math.floor(i / COLS);
                const c = i % COLS;
                return (
                    <div
                        key={`label-${i}`}
                        style={{
                            position: 'absolute',
                            left: c * dimensions.pieceWidth + dimensions.pieceWidth / 2,
                            top: r * dimensions.pieceHeight + dimensions.pieceHeight / 2,
                            transform: 'translate(-50%, -50%)',
                            color: 'cyan',
                            fontSize: '32px',
                            fontWeight: 'bold',
                            textShadow: '0 0 4px black, 0 0 8px black',
                            zIndex: 1000,
                            pointerEvents: 'none'
                        }}
                    >
                        {i + 1}
                    </div>
                );
            })}
        </div>
    );
};

export default PuzzleBoard;
