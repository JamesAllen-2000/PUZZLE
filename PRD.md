# Product Requirements Document (PRD)

| **Project Name** | Live Jigsaw Reveal Experience |
| :--- | :--- |
| **Version** | 1.0 |
| **Status** | Draft / In-Development |
| **Platform** | Web Application (React/Vite) |
| **Target Hardware** | Laptop outputting to LED Wall / Projector |

---

## 1. Executive Summary
The goal is to build a high-performance, browser-based visual application for a live event. The application will display a black screen that progressively reveals a "Grand Prize" image hidden behind a 10-piece jigsaw puzzle. As each level of the event is cleared, a piece flies in from 3D space, snaps into place, and triggers visual effects (glow/confetti).

## 2. User Stories
* **As an Operator (AV Tech):** I want to trigger the reveal of the next puzzle piece with a single key press (Spacebar) so that I don't have to look down at the keyboard during the show.
* **As an Operator:** I want to be able to manually toggle specific pieces using number keys in case the sequence needs to be corrected.
* **As an Attendee:** I want to see a smooth, high-quality animation where pieces appear to fly in from "out of the screen" and snap together to form the final image.

## 3. Functional Requirements

### 3.1. The Puzzle Mechanics
* **Grid Layout:** The image must be divided into a **2 Row x 5 Column** grid (10 total pieces).
* **Shape Style:** Pieces must use organic **Jigsaw Shapes** (interlocking tabs and holes), generated procedurally via SVG paths.
* **Aspect Ratio:** The container must respect the aspect ratio of the source image (`puzzle.png`), centering it on the screen.

### 3.2. Controls (Input)
| Key | Action |
| :--- | :--- |
| **SPACEBAR** | Reveal the next hidden piece in sequential order (0 $\rightarrow$ 9). |
| **1 - 9** | Toggle specific pieces 1 through 9. |
| **0** | Toggle the 10th piece. |

### 3.3. Animation & Visuals
* **3D Perspective:** The container must use CSS `perspective` to create a 3D environment.
* **Entrance Animation:**
    * **Start State:** High Z-index (close to camera), randomized X/Y rotation, opacity 0.
    * **End State:** Z-index 0 (flat on wall), 0 rotation, opacity 1.
    * **Physics:** Use "Spring" physics (damping/stiffness) for a heavy "slam" effect.
* **Impact Effects:**
    * **Confetti:** A particle system (`canvas-confetti`) triggers on piece completion.
    * **Glow:** A Gold (`#FFD700`) stroke animation flashes around the piece border.
    * **Drop Shadow:** Dynamic shadows that fade as the piece lands.

## 4. Technical Specifications

### 4.1. Tech Stack
* **Core:** React 18+
* **Build Tool:** Vite
* **Animation:** `framer-motion` (for 3D transforms and layout animations).
* **Effects:** `canvas-confetti`.

### 4.2. Asset Requirements
* **Image Path:** `/src/assets/puzzle.png`
* **Resolution:** High Resolution (1080p or 4K recommended).
* **Format:** PNG or JPG.

### 4.3. Performance Constraints
* **Frame Rate:** Target **60 FPS**.
* **Responsiveness:** Must utilize `100vw` and `100vh` to fill any screen size without scrolling.
* **Cursor:** The mouse cursor must be hidden (`cursor: none`) during operation.

## 5. Implementation Checklist

### Phase 1: Setup & Configuration
- [x] Initialize Vite React Project.
- [x] Install dependencies (`framer-motion`, `canvas-confetti`).
- [x] Configure global CSS (Reset, Black background, overflow hidden).

### Phase 2: Core Logic
- [x] Implement the 2x5 Grid Logic.
- [x] Develop SVG Path Generator (Bezier curves for tabs/holes).
- [x] Implement Edge Matching (Tabs fit into Holes).

### Phase 3: Animation & Interaction
- [x] Implement Keyboard Event Listeners.
- [x] Apply Framer Motion 3D transforms (`rotateX`, `rotateY`, `z`).
- [x] Add Confetti triggers.
- [ ] **Optional:** Add Sound Effect (`thud.mp3`) trigger.

### Phase 4: Production Polish
- [ ] Verify color contrast on LED Screen.
- [ ] Test Aspect Ratio scaling on different monitors.
- [ ] Build for Production (`npm run build`).