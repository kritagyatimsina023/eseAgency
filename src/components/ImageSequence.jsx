// ImageSequence.jsx
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 49; // 0 to 49

// Build your image paths — adjust to match your naming convention
const getImagePath = (index) =>
  `/WebXProjectsAssets/Sequence_animation/ese-hero-sequence${String(index).padStart(2, "0")}.webp`;

const ImageSequence = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const framesRef = useRef([]);
  const currentFrameRef = useRef({ frame: 49 });

  const renderFrame = (index, images) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = (images || framesRef.current)[index];
    if (!img || !img.complete) return;

    // Match canvas size to its display size for crisp rendering
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cover-style: scale image to fill canvas
    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight,
    );
    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;
    ctx.drawImage(
      img,
      x,
      y,
      img.naturalWidth * scale,
      img.naturalHeight * scale,
    );
  };

  useGSAP(() => {
    const obj = currentFrameRef.current;
    gsap.to(obj, {
      frame: 0,
      snap: "frame", // snap to whole numbers so we always hit exact frames
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%", // pin for 3x the viewport height — adjust for speed
        pin: true, // pins the section while scrolling through frames
        scrub: 0.5, // slight smoothing (lower = snappier)
        onUpdate: () => renderFrame(Math.round(obj.frame)),
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Your overlay content goes here */}
      <div className="absolute bottom-8 left-8 text-white text-sm opacity-60">
        Scroll to explore
      </div>
    </section>
  );
};

export default ImageSequence;
