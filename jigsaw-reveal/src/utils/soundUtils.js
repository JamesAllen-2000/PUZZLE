import magicSound from '../assets/magic.mp3';

export const playSwishSound = () => {
    try {
        const audio = new Audio(magicSound);
        audio.volume = 0.5; // Adjust volume as needed
        audio.play().catch(e => console.error("Audio play failed:", e));
    } catch (e) {
        console.error("Audio setup failed:", e);
    }
};
