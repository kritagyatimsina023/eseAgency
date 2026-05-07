import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    src: "/WebXProjectsAssets/GradientImage/695e471fe749f0b344819290_ese-expertise-bw-campaigning-2.png",
    label: "Campaigning",
    marquee:
      "Concept – Key-Visual – Storytelling – Employer Branding – Content-Creation –",
  },
  {
    id: 2,
    src: "/WebXProjectsAssets/GradientImage/MigrosCard.png",
    label: "Social Media",
    marquee:
      "Campaigning – TikTok – Influencer Marketing – Instagram – Content Creation – LinkedIn –",
  },
  {
    id: 3,
    src: "/WebXProjectsAssets/GradientImage/MigrosLaptop.png",
    label: "Branding & Design",
    marquee:
      "Corporate Design – Corporate Identity – (Re-)Branding – Logo – Corporate Language –",
  },
  {
    id: 4,
    src: "/WebXProjectsAssets/GradientImage/Mirgos.png",
    label: "Employer Branding",
    marquee:
      "Employer Value Proposition – Analysis – Identity – Internal Communication – Content –",
  },
];

const DWELL = 0.9;
const SLIDE = 0.6;

const MarqueeStrip = ({ text }) => {
  const ref = useRef(null);
  const tweenRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useGSAP(() => {
    const el = ref.current;
    const halfWidth = el.scrollWidth / 2;

    tweenRef.current = gsap.to(el, {
      x: -halfWidth,
      ease: "none",
      duration: 80,
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % halfWidth),
      },
    });

    ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity();
        if (Math.abs(v) < 10) return;
        const dir = v > 0 ? 1 : -1;
        const scale = dir * Math.min(1 + Math.abs(v) * 0.002, 6);
        gsap.killTweensOf(tweenRef.current, "timeScale");
        gsap.to(tweenRef.current, {
          timeScale: scale,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () =>
            gsap.to(tweenRef.current, {
              timeScale: 1,
              duration: 1.5,
              ease: "power2.inOut",
            }),
        });
      },
    });
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={ref}
        className="flex whitespace-nowrap cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className={`shrink-0 font-suisse font-medium transition-all duration-500 ${
              hovered
                ? "text-transparent opacity-50 [-webkit-text-stroke:2px_white]"
                : "text-white opacity-100"
            }`}
            style={{
              fontSize: "clamp(2.5rem, 7vw, 8rem)", // ✅ responsive font size
              lineHeight: 1,
              marginRight: "2.5rem",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

const MiddleCard = () => {
  const outerRef = useRef(null);
  const stickyRef = useRef(null);
  const cardsRef = useRef([]);
  const progressFillRefs = useRef([]);

  useGSAP(() => {
    const cardEls = cardsRef.current.filter(Boolean);
    const total = cardEls.length;
    if (total === 0) return;

    gsap.set(cardEls[0], { y: 0 });
    cardEls.slice(1).forEach((el) => gsap.set(el, { y: "100vh" }));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.8,
        invalidateOnRefresh: true,
      },
    });

    for (let i = 1; i < total; i++) {
      const slideStart = (i - 1) * (DWELL + SLIDE) + DWELL;
      tl.to(
        cardEls[i],
        { y: 0, ease: "power2.inOut", duration: SLIDE },
        slideStart,
      );
    }

    const totalScrollVh = cards.length * DWELL + (cards.length - 1) * SLIDE;
    const outerEl = outerRef.current;

    for (let i = 0; i < total; i++) {
      const fill = progressFillRefs.current[i];
      if (!fill) continue;

      const dwellStart = i === 0 ? 0 : i * (DWELL + SLIDE) - SLIDE;
      const dwellEnd = dwellStart + DWELL + (i === 0 ? 0 : SLIDE);

      const sectionHeight = totalScrollVh * window.innerHeight;
      const startPx = (dwellStart / totalScrollVh) * sectionHeight;
      const endPx = (dwellEnd / totalScrollVh) * sectionHeight;

      gsap.fromTo(
        fill,
        { width: "0%" },
        {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: outerEl,
            start: `top+=${startPx}px top`,
            end: `top+=${endPx}px top`,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onLeave: () => gsap.set(fill, { width: "100%" }),
            onEnterBack: () => gsap.set(fill, { width: "100%" }),
            onLeaveBack: () => {
              if (i > 0) gsap.set(fill, { width: "0%" });
            },
          },
        },
      );
    }
  }, []);

  const totalScrollVh = cards.length * DWELL + (cards.length - 1) * SLIDE;

  return (
    <div
      className="bg-black"
      ref={outerRef}
      style={{ height: `${totalScrollVh * 100}vh` }}
    >
      <div
        ref={stickyRef}
        className="sticky bg-black top-0 h-screen w-full overflow-hidden"
      >
        {cards.map((card, idx) => (
          <div
            key={card.id}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="absolute inset-0 w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 50% 0%,   #E8A020 0%, transparent 60%),
                radial-gradient(ellipse 60% 80% at 100% 60%, #D4006A 0%, transparent 55%),
                radial-gradient(ellipse 90% 90% at 50% 50%, #B52010 0%, #7A0010 100%)
              `,
              willChange: "transform",
            }}
          >
            <img
              src={card.src}
              alt={card.label}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)",
              }}
            />

            <p
              className="absolute mb-10 z-10 text-white font-semibold  px-7 text-xl sm:text-2xl md:text-3xl"
              style={{ bottom: "calc(1em + clamp(2.5rem, 7vw, 8rem) + 16px)" }}
            >
              {card.label}
            </p>

            <div className="absolute bottom-10 left-0 w-full z-10 pb-2">
              <MarqueeStrip text={card.marquee} />
            </div>
          </div>
        ))}

        {/* Progress bars */}
        <div
          className="absolute bottom-0 left-0 w-full flex gap-2 px-7 pb-4"
          style={{ zIndex: 50 }}
        >
          {cards.map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-full overflow-hidden"
              style={{ height: "3px", background: "rgba(255,255,255,0.3)" }}
            >
              <div
                ref={(el) => (progressFillRefs.current[i] = el)}
                style={{
                  height: "100%",
                  width: "0%",
                  background: "white",
                  borderRadius: "9999px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiddleCard;
