// import React, { useRef } from "react";
// import { useToggle } from "../store/useToggle";
// import { useGSAP } from "@gsap/react";
// import { navData } from "../constants/data";

// const Cross = () => {
//   const { openNav, setOpenNav } = useToggle();
//   const topLineRef = useRef(null);
//   const bottomLineRef = useRef(null);
//   useGSAP(() => {}, []);
//   return (
//     <div
//       onClick={handleToggle}
//       className="flex flex-col justify-center items-center gap-1 transition-all
//        duration-300  rounded-full cursor-pointer w-12 h-12 md:w-18 md:h-18"
//     >
//       <span
//         ref={topLineRef}
//         className="block w-8 h-0.5 bg-black rounded-full origin-center"
//       ></span>
//       <span
//         ref={bottomLineRef}
//         className="block w-8 h-0.5 bg-black rounded-full origin-center"
//       ></span>
//     </div>
//   );
// };

// export default Cross;
