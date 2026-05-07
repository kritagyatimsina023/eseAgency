import NavBar from "./NavBar";
import { heroData } from "../constants/data";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const HeroTwo = () => {
  const marqueeRef = useRef(null);
  const tweenRef = useRef(null);
  const videoRef = useRef(null);
  const pinRef = useRef(null);
  const marqueeWrap = useRef(null);

  useGSAP(() => {
    const marquee = marqueeRef.current;
    const video = videoRef.current;
    const totalWidth = marquee.scrollWidth;
    tweenRef.current = gsap.to(marquee, {
      x: () => -(marquee.scrollWidth / 2),
      ease: "none",
      duration: 20,
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
        // console.log("Target scale", targetScale);
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

    video.onloadedmetadata = () => {
      gsap.to(video, {
        currentTime: video.duration,
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=90%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });
    };

    const updateMarqueeY = () => {
      gsap.set(marqueeWrap.current, { y: -window.scrollY });
    };
    window.addEventListener("scroll", updateMarqueeY, { passive: true });
    return () => window.removeEventListener("scroll", updateMarqueeY);
  }, []);
  return (
    <>
      <div className="absolute top-0 left-0 w-full z-50">
        <NavBar />
      </div>
      <div ref={pinRef} className="relative w-full h-screen z-30">
        <video
          ref={videoRef}
          src="/WebXProjectsAssets/Sequence_animation/output.webm"
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          webkit-playsinline="true"
        />
      </div>
      <div
        ref={marqueeWrap}
        className="fixed bottom-0 left-0 w-full z-30  pb-6"
        style={{ willChange: "transform" }}
      >
        <div className="flex w-full justify-between px-7 pb-4 text-white">
          {heroData.map((item, idx) => (
            <span key={idx}>{item}</span>
          ))}
        </div>
        <div className="overflow-hidden w-full">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap text-white text-9xl md:text-[10rem] font-semibold"
          >
            {[...Array(12)].map((_, i) => (
              <span key={i} className="mr-20">
                Overtake time with us
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroTwo;
