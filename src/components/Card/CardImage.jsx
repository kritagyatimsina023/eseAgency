import React, { useRef } from "react";
import { ImageCardData } from "../../constants/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const CardImage = () => {
  const imageRef = useRef([]);
  const imgSection = useRef(null);
  return (
    <div
      ref={imgSection}
      className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
    >
      {ImageCardData.map((img, index) => (
        <div
          ref={(el) => (imageRef.current[index] = el)}
          key={img.id}
          className=" relative rounded-xs max-w-100 
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
                 rounded-full w-10 h-10 bg-white pointer-events-none transition-opacity duration-300 ease-in-out "
          >
            <span className="text-black text-lg group-hover:rotate-45 trasntion-all duration-300 ease-in-out ">
              +
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardImage;
