import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Brands = () => {
  const brandRef = useRef([]);
  const brandSectionRef = useRef(null);

  useGSAP(() => {
    if (!brandRef.current.length) return;

    gsap.set(brandRef.current, { yPercent: -50, opacity: 0 });

    gsap.to(brandRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.2,
      ease: "power3.out",
      stagger: { each: 0.1, from: "start" },
      scrollTrigger: {
        trigger: brandSectionRef.current,
        start: "50% 80%",
        end: "170% top",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  const handleMouseEnter = (idx) => {
    brandRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: i === idx ? 1 : 0.3,
        scale: i === idx ? 1.05 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  const handleMouseLeave = () => {
    brandRef.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  return (
    <section className="min-h-screen bg-black text-white">
      <div className="md:mx-7 px-7 py-45">
        <h1 className="text-5xl mt-20">
          Together we are <br />
          achieving great things
        </h1>
        <div className="mt-8">
          <div
            ref={brandSectionRef}
            className="grid grid-cols-3 cursor-pointer gap-3 md:grid-cols-4 lg:grid-cols-5 overflow-hidden"
          >
            {[...Array(15)].map((_, idx) => (
              <div
                ref={(el) => (brandRef.current[idx] = el)}
                key={idx}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
                className="bg-[#212121] rounded-lg max-w-80"
              >
                <img src="/WebXProjectsAssets/Brands/kellerBrand.png" alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
