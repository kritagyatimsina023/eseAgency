import { navData } from "../constants/data";
import { useToggle } from "../store/useToggle";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NavBar = () => {
  const { openNav, setOpenNav } = useToggle();
  const navRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const linksRef = useRef([]);
  const tl = useRef(null);
  const iconsTimeline = useRef(null);

  useGSAP(() => {
    gsap.set(navRef.current, { yPercent: -100 });
    gsap.set(linksRef.current, { opacity: 0 });
    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        yPercent: 0,
        delay: 0.3,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          opacity: 1,
          stagger: 0.1,
          duration: 0.3,
          ease: "power2.out",
        },
        "<",
      );
    iconsTimeline.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          ease: "power2.inOut",
          duration: 0.3,
        },
        "<",
      );
  }, []);
  const toggleMenu = () => {
    console.log("Toggle clicked. ", openNav);
    if (openNav) {
      tl.current.reverse();
      iconsTimeline.current.reverse();
    } else {
      tl.current.play();
      iconsTimeline.current.play();
    }
    setOpenNav(!openNav);
  };

  return (
    <>
      <div className="flex w-full fixed z-[60]  items-center px-7 py-3 justify-between">
        <h1 className="font-bold md:hidden  text-2xl text-white ">
          ese agency
        </h1>
        <div
          onClick={toggleMenu}
          className="flex flex-col md:hidden relative right-0  justify-center items-center gap-1 transition-all 
       duration-300  rounded-full cursor-pointer w-12 h-12 md:w-18 md:h-18"
        >
          <span
            ref={topLineRef}
            className="block w-8 h-0.5 bg-white rounded-full origin-center"
          ></span>
          <span
            ref={bottomLineRef}
            className="block w-8 h-0.5 bg-white rounded-full origin-center"
          ></span>
        </div>
      </div>
      <nav
        ref={navRef}
        className="bg-[#282828]
    fixed z-40 w-full h-full p-7"
      >
        <div className="py-8">
          <ul className="flex flex-col gap-4  mt-10">
            {navData.map((item, index) => (
              <li
                className="cursor-pointer"
                ref={(el) => (linksRef.current[index] = el)}
                key={index}
              >
                <a
                  href={item.href}
                  className="text-white font-semibold text-4xl flex items-center gap-3"
                >
                  <span className="flex items-center gap-2">
                    {item.name}
                    {item.icons && (
                      <span className="bg-gray-500 p-1 backdrop-blur-4xl rounded-full">
                        {item.icons}
                      </span>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <nav className="flex fixed items-center z-50 justify-between w-full p-7">
        <h1 className="font-bold max-md:hidden text-2xl text-white ">
          ese agency
        </h1>
        <div className="items-center hidden md:flex justify-between gap-12">
          <div className="items-center flex  gap-6">
            {navData.map((item, idx) => (
              <span
                key={idx}
                className="flex items-center text-white text-xs justify-center gap-1"
              >
                {item.name} {item.icons && item.icons}{" "}
              </span>
            ))}
          </div>
          <span className="text-xs text-white">De En</span>
        </div>
      </nav>

      {/* <nav className="flex items-center justify-between w-full">
        <HeaderPart />
        <div className="items-center hidden md:flex justify-between gap-12">
          <div className="items-center flex  gap-6">
            {navData.map((item) => (
              <span className="flex items-center text-xs justify-center gap-1">
                {item.name} {item.icons && item.icons}{" "}
              </span>
            ))}
          </div>
          <span className="text-xs">De En</span>
        </div>
      </nav> */}
    </>
  );
};

export default NavBar;
