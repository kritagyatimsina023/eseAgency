import NavBar from "./NavBar";
import { heroData } from "../constants/data";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 38;
const getImagePath = (n) =>
  `/WebXProjectsAssets/Sequence_animation/ese-hero-sequence${String(n).padStart(2, "10")}.webp`;

const Hero = () => {
  const marqueeRef = useRef(null);
  const tweenRef = useRef(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const frameObj = useRef({ f: 38 });

  const drawFrame = (frameNumber, imgs) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = (imgs ?? framesRef.current)[frameNumber - 1];
    if (!img?.complete) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
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
  useEffect(() => {
    const imgs = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getImagePath(i);
      imgs.push(img);
    }
    framesRef.current = imgs;
    imgs[10].onload = () => drawFrame(38, imgs);
  }, []);

  useGSAP(() => {
    const marquee = marqueeRef.current;
    const totalWidth = marquee.scrollWidth / 2;

    tweenRef.current = gsap.to(marquee, {
      x: () => -totalWidth,
      ease: "none",
      duration: 16,
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        if (Math.abs(velocity) < 10) return;
        const targetScale =
          velocity > 0
            ? Math.min(1 + Math.abs(velocity) * 0.003, 6)
            : -Math.min(1 + Math.abs(velocity) * 0.003, 6);
        gsap.to(tweenRef.current, {
          timeScale: targetScale,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () =>
            gsap.to(tweenRef.current, {
              timeScale: 1,
              duration: 1.2,
              ease: "power2.inOut",
            }),
        });
      },
    });

    gsap.to(frameObj.current, {
      f: 1,
      snap: "f",
      ease: "none",
      scrollTrigger: {
        trigger: canvasRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        markers: true,
        scrub: 0.5,
        onUpdate: () => drawFrame(Math.round(frameObj.current.f)),
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between z-30 "
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10">
        <NavBar />
      </div>

      <div className="relative z-10">
        <div className="flex w-full justify-between p-7 text-white">
          {heroData.map((item, idx) => (
            <span key={idx}>{item}</span>
          ))}
        </div>
        <div className="overflow-hidden w-full">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap text-white text-8xl font-semibold"
          >
            <span className="mr-20">Overtake time with us</span>
            <span className="mr-20">Overtake time with us</span>
            <span className="mr-20">Overtake time with us</span>
            <span className="mr-20">Overtake time with us</span>
            <span className="mr-20">Overtake time with us</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
