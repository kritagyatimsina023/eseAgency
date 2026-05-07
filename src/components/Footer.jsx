import { ArrowDown, ArrowUp } from "lucide-react";
import { footerContact } from "../constants/data";
import { useState } from "react";
import Marquee from "./Marquee";

const Footer = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (idx) => setOpenIdx(openIdx === idx ? null : idx);

  return (
    <>
      <footer className=" md:mx-7 px-7 text-white flex flex-col md:flex-row md:justify-between ">
        <h1 className="font-bold text-2xl">ese agency</h1>
        <div className="hidden md:grid  md:grid-cols-4 gap-10 ">
          {footerContact.map((footer) => (
            <div key={footer.id} className="flex flex-col gap-4">
              <h2 className="text-white font-semibold mb-2">{footer.title}</h2>
              {footer.title === "Contact" ? (
                <div className="flex flex-col gap-3 text-sm text-[#9B9B9B]">
                  <p className="whitespace-pre-line">{footer.data.location}</p>
                  <p>{footer.data.email}</p>
                  <p>{footer.data.contact}</p>
                </div>
              ) : (
                footer.data.map((item, i) => (
                  <p
                    key={i}
                    className="text-sm text-[#9B9B9B] hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {item}
                  </p>
                ))
              )}
            </div>
          ))}
        </div>

        <div className="md:hidden mt-10 space-y-5 cursor-pointer">
          {footerContact.map((footer, idx) => (
            <div key={footer.id} className="">
              <div
                onClick={() => toggle(idx)}
                className="flex justify-between items-center"
              >
                <h2>{footer.title}</h2>
                <button className="bg-[#4F4F4F] w-fit rounded-full flex items-center justify-center p-1">
                  {openIdx === idx ? (
                    <ArrowUp size={12} />
                  ) : (
                    <ArrowDown size={12} />
                  )}
                </button>
              </div>
              {openIdx === idx && (
                <div className="mt-4 space-y-3 text-sm text-[#9B9B9B]">
                  {footer.title === "Contact" ? (
                    <>
                      <p className="whitespace-pre-line">
                        {footer.data.location}
                      </p>
                      <p>{footer.data.email}</p>
                      <p>{footer.data.contact}</p>
                    </>
                  ) : (
                    footer.data.map((item, i) => (
                      <p
                        key={i}
                        className="hover:text-white transition-colors duration-200"
                      >
                        {item}
                      </p>
                    ))
                  )}
                </div>
              )}
              <div className="bg-[#515151] w-full h-[1px] mt-5" />
            </div>
          ))}
        </div>
      </footer>
      <Marquee />
    </>
  );
};

export default Footer;
