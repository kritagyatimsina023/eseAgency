import React, { useRef } from "react";
import HeaderPart from "./HeaderPart";
import { navData } from "../constants/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Cross from "./Cross";
import { useToggle } from "../store/useToggle";

const MobileNav = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const tl = useRef(null);
  const { openNav, setOpenNav } = useToggle();

  useGSAP(() => {
    gsap.set(navRef.current, { yPercent: 100 });
    gsap.set(linksRef.current, { autoAlpha: 0, y: -20 });
    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<",
      );
  });
  const toggleMenu = () => {
    if (openNav) {
      tl.current.reverse();
    } else {
      tl.current.play();
      setOpenNav(!openNav);
    }
  };

  return (
    <nav
      ref={navRef}
      className="bg-[#282828] min-h-screen 
    fixed inset-0"
    >
      <HeaderPart />
      <div className="p-7">
        <ul className="flex flex-col gap-4">
          {navData.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="text-white font-semibold text-4xl "
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MobileNav;
