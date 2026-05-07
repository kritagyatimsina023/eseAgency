import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const countRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };

    const countTween = gsap.to(obj, {
      val: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = Math.round(obj.val);
        }
      },
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    return () => countTween.kill();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black z-[99998] flex flex-col items-center justify-center gap-6"
    >
      <p
        ref={countRef}
        className="text-white font-semibold leading-none tracking-tight tabular-nums text-5xl"
      >
        0
      </p>
    </div>
  );
};

export default Loader;
