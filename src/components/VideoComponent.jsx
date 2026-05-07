import { useRef, useState, useEffect } from "react";
import { GiSoundOn, GiSoundOff } from "react-icons/gi";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { cardsData } from "../constants/data";

gsap.registerPlugin(SplitText);

const VideoComponent = () => {
  const scrollContainerRef = useRef(null);
  const quoteRef = useRef(null);
  const videoRef = useRef(null);
  const loaderRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const showLoader = () =>
    new Promise((resolve) => {
      if (!loaderRef.current) return resolve();
      gsap.to(loaderRef.current, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: resolve,
      });
    });

  const hideLoader = () =>
    new Promise((resolve) => {
      if (!loaderRef.current) return resolve();
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: resolve,
      });
    });

  const animateQuoteIn = () =>
    new Promise((resolve) => {
      if (!quoteRef.current) return resolve();
      gsap.killTweensOf(quoteRef.current);
      const split = new SplitText(quoteRef.current, {
        type: "words, chars",
        charsClass: "char",
        wordsClass: "word",
      });
      gsap.fromTo(
        split.chars,
        { y: 30, opacity: 0, autoAlpha: 0 },
        {
          y: 0,
          opacity: 1,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.02,
          ease: "power3.out",
          onComplete: resolve,
        },
      );
    });

  const changeVideo = (newVideoSrc) =>
    new Promise((resolve) => {
      if (!videoRef.current) return resolve();
      videoRef.current.src = newVideoSrc;
      videoRef.current.load();
      const onCanPlay = () => {
        videoRef.current.removeEventListener("canplay", onCanPlay);
        videoRef.current
          .play()
          .then(() => {
            videoRef.current.muted = isMuted;
            resolve();
          })
          .catch(resolve);
      };
      videoRef.current.addEventListener("canplay", onCanPlay);
      setTimeout(resolve, 3000);
    });

  const handleSoundToggle = () => {
    if (videoRef.current) {
      const next = !isMuted;
      videoRef.current.muted = next;
      setIsMuted(next);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleUserClick = async (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    await showLoader();
    if (quoteRef.current) quoteRef.current.textContent = cardsData[index].quote;
    await changeVideo(cardsData[index].videoSrc);
    setCurrentIndex(index);
    await hideLoader();
    await animateQuoteIn();
    setIsTransitioning(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleWaiting = () => showLoader();
    const handlePlaying = () => hideLoader();
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    return () => {
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    if (!quoteRef.current) return;
    const split = new SplitText(quoteRef.current, {
      type: "words, chars",
      charsClass: "char",
    });
    gsap.fromTo(
      split.chars,
      { y: 30, opacity: 0, autoAlpha: 0 },
      {
        y: 0,
        opacity: 1,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.02,
        ease: "power3.out",
      },
    );
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-black px-3 sm:px-4 py-8 sm:py-10">
      <div className="relative w-full sm:mx-4 md:mx-7 rounded-2xl md:rounded-4xl overflow-hidden">
        <div
          ref={videoWrapperRef}
          className="relative w-full"
          style={{ borderRadius: "inherit" }}
        >
          {/* ── Video ── */}
          <video
            ref={videoRef}
            className="w-full h-[70vw] sm:h-[60vw] md:h-[50vw] lg:h-[720px] object-cover opacity-80 block"
            style={{ borderRadius: "inherit" }}
            autoPlay
            playsInline
            loop
            muted={isMuted}
            src={cardsData[0].videoSrc}
          />

          {/* ── Loader overlay ── */}
          <div
            ref={loaderRef}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              opacity: 0,
              pointerEvents: "none",
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.45)",
            }}
          >
            <div className="loader-ring" />
          </div>

          {/* ── Top-right controls ── */}
          <div className="absolute top-2.5 right-2.5 sm:top-5 sm:right-5 flex gap-1.5 sm:gap-3 text-white z-20">
            <button
              onClick={handlePlayPause}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/60 transition-all"
            >
              {isPlaying ? (
                <IoPlayBack size={14} className="sm:hidden rotate-180" />
              ) : (
                <IoPlayForward size={14} className="sm:hidden" />
              )}
              {isPlaying ? (
                <IoPlayBack size={20} className="hidden sm:block rotate-180" />
              ) : (
                <IoPlayForward size={20} className="hidden sm:block" />
              )}
            </button>

            <button
              onClick={handleSoundToggle}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/60 transition-all"
            >
              {isMuted ? (
                <>
                  <GiSoundOff size={14} className="sm:hidden" />
                  <GiSoundOff size={20} className="hidden sm:block" />
                </>
              ) : (
                <>
                  <GiSoundOn size={14} className="sm:hidden" />
                  <GiSoundOn size={20} className="hidden sm:block" />
                </>
              )}
            </button>
          </div>

          <div
            className="absolute inset-0 flex flex-col items-start justify-end z-10
                          px-3 pb-3
                          sm:px-5 sm:pb-6
                          md:px-8 md:pb-8
                          gap-1.5 sm:gap-2.5 md:gap-4"
          >
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: "65%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                borderRadius: "inherit",
                zIndex: -1,
              }}
            />

            <p
              ref={quoteRef}
              className="text-white font-bold leading-tight
                         text-[clamp(0.75rem,2.8vw,2.25rem)]
                         max-w-[95%] sm:max-w-[80%] md:max-w-[65%] lg:max-w-[55%]"
            >
              {cardsData[0].quote}
            </p>

            <h2
              className="text-[#9B9B9B]
                           text-[clamp(0.6rem,1.8vw,1rem)]
                           leading-none"
            >
              {cardsData[currentIndex].name}
            </h2>

            <div
              ref={scrollContainerRef}
              className="w-full overflow-x-auto pb-1 hide-scrollbar"
            >
              <div className="flex gap-2 sm:gap-3 md:gap-5 min-w-max">
                {cardsData.map((card, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleUserClick(idx)}
                    className={`flex items-center gap-1.5 sm:gap-2 md:gap-3
                                px-2 sm:px-3 py-1.5 sm:py-2
                                flex-shrink-0 cursor-pointer rounded-md
                                transition-all duration-300
                                ${
                                  currentIndex === idx
                                    ? "opacity-100 scale-105 bg-white/10 backdrop-blur-2xl"
                                    : "opacity-50 hover:opacity-90 hover:scale-105"
                                }`}
                  >
                    <div
                      className="rounded-full overflow-hidden border border-white flex-shrink-0
                                    w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12"
                    >
                      <img
                        className="w-full h-full object-cover p-[2px] rounded-full"
                        src={card.img}
                        alt={card.reviewer}
                      />
                    </div>

                    {/* Name + role — hidden on very small screens to save space */}
                    <div className="flex flex-col flex-shrink-0 hidden xs:flex sm:flex">
                      <span
                        className="text-white whitespace-nowrap
                                       text-[10px] sm:text-xs md:text-sm"
                      >
                        {card.reviewer}
                      </span>
                      <span
                        className="text-[#7C7C7C] whitespace-nowrap
                                       text-[9px] sm:text-[10px] md:text-xs"
                      >
                        {card.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoComponent;
