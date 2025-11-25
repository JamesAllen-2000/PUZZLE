// Manual position adjustments for each puzzle piece
// offsetX and offsetY are PERCENTAGES of the piece width/height (0.0 to 1.0)
// Example: offsetX: 0.1 means move right by 10% of piece width
// Positive X moves right, negative X moves left
// Positive Y moves down, negative Y moves up

export const PIECE_POSITION_ADJUSTMENTS = [
  // Row 0
  [
    { offsetX: 0, offsetY: 0 },              // Piece 1 (top-left)
    { offsetX: 0.0343, offsetY: 0 },         // Piece 2 (8px → 3.43%)
    { offsetX: 0.052, offsetY: 0 },         // Piece 3 (12px → 5.15%)
    { offsetX: -0.01, offsetY: 0 },              // Piece 4
    { offsetX: 0.15, offsetY: 0 }          // Piece 5 (31.5px → 13.52%)
  ],
  // Row 1
  [
    { offsetX: -0.034, offsetY: 0.19 },   // Piece 6 (-5px, 62px → -2.15%, 15.96%)
    { offsetX: -0.124, offsetY: 0.21 },   // Piece 7 (-23px, 70px → -9.87%, 18.02%)
    { offsetX: 0.084, offsetY: 0.22 },    // Piece 8 (19.127px, 73.5px → 8.21%, 18.92%)
    { offsetX: 0.128, offsetY: 0.209 },     // Piece 9 (27.5px, 68.5px → 11.8%, 17.63%)
    { offsetX: 0.0322, offsetY: 0.175 }     // Piece 10 (7.5px, 57px → 3.22%, 14.67%)
  ]
];

// Scale adjustments (if pieces need to be slightly bigger/smaller)
export const PIECE_SCALE_ADJUSTMENTS = [
  // Row 0
  [
    { scaleX: 1.03, scaleY: 1.0 }, // Piece 1
    { scaleX: 1.0, scaleY: 1.0 }, // Piece 2
    { scaleX: 1.0, scaleY: 1.0 }, // Piece 3
    { scaleX: 1.16, scaleY: 1.0 }, // Piece 4
    { scaleX: 1.0, scaleY: 1.0 }  // Piece 5
  ],
  // Row 1
  [
    { scaleX: 0.98, scaleY: 0.8 }, // Piece 6
    { scaleX: 1.26, scaleY: 0.77 }, // Piece 7
    { scaleX: 0.957, scaleY: 0.76 }, // Piece 8
    { scaleX: 0.89, scaleY: 0.77 }, // Piece 9
    { scaleX: 1.22, scaleY: 0.805 }  // Piece 10
  ]
];