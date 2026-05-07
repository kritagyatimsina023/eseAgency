import { useRef } from "react";

import { ImageCardData } from "../constants/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowUpRight } from "lucide-react";
import Description from "./Description";
import Brands from "./Brands";
gsap.registerPlugin(ScrollTrigger);

const Info = () => {
  const imageRef = useRef([]);
  const imgSection = useRef(null);
  const sectionRef = useRef(null);
  const text = ` Culture-driven, creative and competitive. Our digital agency creates
        impact for brands. In the disciplines Websites, social media, content
        marketing, campaigning and branding. Between timeless and zeitgeist.
        When we communicate: Effectively. Quick witted. Ambitious. This is ESE
        Agency.`;

  const text2 = `Why usWe see our clients as strategic partners. This means: In close cooperation, we are there for a wide range of marketing tasks. We implement our ideas and concepts seamlessly — everything from a single source. We are not satisfied with "run-of-the-mill". We challenge ourselves and others. This is how we guarantee high-quality and sustainable results.`;

  useGSAP(() => {
    const firstRow = imageRef.current.slice(0, 4);
    const secondRow = imageRef.current.slice(4, 8);

    gsap.from(firstRow, {
      yPercent: -50,
      autoAlpha: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imgSection.current,
        start: "20% center",
        end: "130% top",
        // markers: true,
        toggleActions: "play reverse play reverse",
      },
    });
    gsap.from(secondRow, {
      yPercent: 50,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imgSection.current,
        start: "80% center",
        end: "175% top",
        // markers: true,
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);
  return (
    <section
      ref={sectionRef}
      className="text-white bg-black
      min-h-screen
      px-7 overflow-x-hidden overflow-y-hidden"
    >
      {/* <div ref={textRef} className=" space-x-10 mx-auto overflow-hidden">
        <span className="text-[22px]">This is ESE</span>
        <span className="font-suisse font-extralight transition-all duration-300 ease-linear text-[30px] md:text-[55px] ">
          Culture-driven, creative and competitive. Our digital agency creates
          impact for brands. In the disciplines Websites, social media, content
          marketing, campaigning and branding. Between timeless and zeitgeist.
          When we communicate: Effectively. Quick witted. Ambitious. This is ESE
          Agency.
        </span>
      </div> */}
      <Description text={text} />
      <div
        ref={imgSection}
        className="mt-20 overflow-hidden px-7 grid  grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {ImageCardData.map((img, index) => (
          <div
            ref={(el) => {
              return (imageRef.current[index] = el);
            }}
            key={img.id}
            className="relative rounded-xs max-w-40 md:max-w-110 
              overflow-hidden flex group items-center justify-center cursor-pointer"
          >
            <img
              className="h-full w-full object-cover hover:opacity-80 
                   hover:scale-105 transition-all duration-300 ease-linear"
              src={img.src}
              alt=""
            />
            <div
              className="absolute flex group-hover:opacity-100  opacity-0  top-1/2 left-1/2 
                       -translate-x-1/2 -translate-y-1/2
                         items-center justify-center
                       rounded-full w-10 h-10 bg-white pointer-events-none 
                       transition-opacity duration-300 ease-in-out "
            >
              <span
                className="text-black text-lg group-hover:rotate-45 
              trasntion-all duration-300 ease-in-out "
              >
                +
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center mt-9 overflow-hidden">
        <button
          className="group rounded-full cursor-pointer font-light bg-[#262626]
    duration-300 ease-in-out hover:scale-95  text-xs 
    relative px-6 py-5 h-[44px] flex items-center  justify-center"
        >
          <div className=" overflow-hidden flex">
            <span
              className="flex items-center gap-1  
            transition-transform 
            duration-200 ease-in-out group-hover:-translate-y-4"
            >
              View All <ArrowUpRight size={15} />
            </span>
            <span
              className="absolute  flex items-center gap-1 
            translate-y-8 transition-transform 
            duration-200 ease-in-out group-hover:translate-y-0"
            >
              View All <ArrowUpRight size={15} />
            </span>
          </div>
        </button>
      </div>
      <div className="my-30">
        <Description text={text2} />
      </div>
      {/* <Brands /> */}
    </section>
  );
};

export default Info;
