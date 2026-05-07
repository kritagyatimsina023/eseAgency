import React from "react";
import { useToggle } from "../store/useToggle";
import { CrossIcon } from "lucide-react";
import { IoReorderThreeSharp } from "react-icons/io5";
import Cross from "./Cross";

const HeaderPart = () => {
  const { openNav, setOpenNav } = useToggle();
  return (
    <div className="flex items-center w-full justify-between ">
      <h1 className="font-bold text-2xl text-black ">ese agency</h1>
      {/* <Cross /> */}
    </div>
  );
};

export default HeaderPart;
