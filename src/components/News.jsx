import { ArrowUpRight } from "lucide-react";
import NewsCard from "./Card/NewsCard";
import { newsData } from "../constants/data";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import NewsCardDesktop from "./Card/NewsCardDesktop";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const News = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useGSAP(() => {
    gsap.to("#news", {
      scale: 0.92,
      scrollTrigger: {
        trigger: "#news",
        start: "150% 80%",
        end: "150% 20%",
        scrub: true,
      },
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section
      id="news"
      className="min-h-screen rounded-b-3xl bg-black px-4 sm:px-7 text-white"
    >
      <div className="md:mx-7 px-3 sm:px-7 py-16 sm:py-24 md:py-45">
        <div className="flex flex-wrap items-end gap-4 w-full justify-between">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight">
            Latest news from <br className="hidden sm:block" /> the world of ESE
          </h1>

          <div className="overflow-hidden flex-shrink-0">
            <div
              className="group font-light duration-300 ease-in-out hover:scale-95
                         relative px-4 sm:px-6 py-3 sm:py-5 h-[40px] sm:h-[44px]
                         flex items-center justify-center"
            >
              <div className="overflow-hidden flex">
                <button
                  className="flex items-center gap-1 text-xs sm:text-sm
                             transition-transform duration-200 ease-in-out
                             cursor-pointer group-hover:-translate-y-4"
                >
                  View All
                  <span className="rounded-full p-0.5 bg-[#353535]">
                    <ArrowUpRight size={13} className="sm:hidden" />
                    <ArrowUpRight size={15} className="hidden sm:block" />
                  </span>
                </button>

                <button
                  className="absolute flex items-center gap-1 text-xs sm:text-sm
                             translate-y-8 transition-transform duration-200
                             ease-in-out group-hover:translate-y-0"
                >
                  View All
                  <span className="rounded-full p-0.5 bg-[#353535]">
                    <ArrowUpRight size={13} className="sm:hidden" />
                    <ArrowUpRight size={15} className="hidden sm:block" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-3 flex ${isDesktop ? "flex-row" : "flex-col"} gap-3 py-5 justify-center`}
        >
          {newsData.map((data) =>
            isDesktop ? (
              <NewsCardDesktop data={data} key={data.id} />
            ) : (
              <NewsCard key={data.id} data={data} />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default News;
