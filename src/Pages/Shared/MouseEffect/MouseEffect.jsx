import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const MouseEffect = () => {
  const [particles, setParticles] = useState([]);
  const [active, setActive] = useState(false);
  const [color, setColor] = useState("#ffffff"); // Cursor color

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  // Generate a subtle gradient for each particle
  const getParticleColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 60%)`; // pastel gradient style
  };

  // Spawn particle
  const spawnParticle = (x, y) => {
    const id = Math.random().toString(36).substring(2, 9);
    const size = Math.random() * 6 + 4;
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    const particle = { id, x, y, size, offsetX, offsetY, color: getParticleColor() };
    setParticles((prev) => [...prev, particle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  };

  // Update cursor color based on background brightness
  const updateColor = (x, y) => {
    const element = document.elementFromPoint(x, y);
    if (!element) return;
    const bgColor = window.getComputedStyle(element).backgroundColor;
    if (!bgColor) return;

    const rgb = bgColor.match(/\d+/g);
    if (!rgb) return;

    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;

    setColor(brightness > 200 ? "#000000" : "#ffffff");
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setActive(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      updateColor(e.clientX, e.clientY);
      spawnParticle(e.clientX, e.clientY);

      clearTimeout(handleMouseMove.timeout);
      handleMouseMove.timeout = setTimeout(() => setActive(false), 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(handleMouseMove.timeout);
    };
  }, []);

  return (
    <>
      {/* Cursor Halo with glow */}
      {active && (
        <motion.div
          className="fixed pointer-events-none rounded-full z-50"
          style={{
            width: 40,
            height: 40,
            translateX: springX,
            translateY: springY,
            border: `2px solid ${color}`,
            boxShadow: `0 0 20px 4px ${color}`,
          }}
        />
      )}

      {/* Gradient Particle Trail */}
      <AnimatePresence>
        {active &&
          particles.map((p) => (
            <motion.div
              key={p.id}
              className="fixed pointer-events-none rounded-full z-40"
              style={{
                width: p.size,
                height: p.size,
                left: p.x - p.size / 2,
                top: p.y - p.size / 2,
                background: p.color,
              }}
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 0, x: p.offsetX, y: p.offsetY }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
      </AnimatePresence>
    </>
  );
};

export default MouseEffect;
