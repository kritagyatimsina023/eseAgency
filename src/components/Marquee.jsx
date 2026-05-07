import React, { useState } from "react";

const items = Array(6).fill("Get in contact");

const Marquee = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-full overflow-hidden pb-6 mt-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="marquee-track flex w-max">
        {[...items, ...items].map((text, i) => (
          <span
            key={i}
            className={`
              mx-10 whitespace-nowrap
              text-7xl md:text-[10rem]
              font-medium cursor-pointer
              transition-all duration-300 font-suisse 
              
              ${
                hovered
                  ? `
                    text-transparent
                    opacity-50
                    [-webkit-text-stroke:2px_white]
                  `
                  : "text-white opacity-100"
              }
            `}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
