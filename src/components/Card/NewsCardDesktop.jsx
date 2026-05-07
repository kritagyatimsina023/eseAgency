import { Timer } from "lucide-react";

const NewsCardDesktop = ({ data }) => {
  return (
    <div className="flex flex-col w-full bg-[#262626] rounded-lg cursor-pointer group h-[420px]">
      <div className="h-60 w-full rounded-t-lg overflow-hidden flex-shrink-0">
        <img
          className="h-full w-full object-cover transition-all duration-400 ease-in group-hover:scale-105"
          src={data.src}
          alt=""
        />
      </div>
      <div className="bg-[#262626]  flex flex-col flex-1 rounded-b-lg justify-between">
        <div className="px-5 bg-[#262626] py-5 group-hover:-translate-y-8 transition-all duration-400 ease-in-out">
          <h4 className="text-[#9B9B9B] text-md">{data.newsTitle}</h4>
          <p className="text-2xl line-clamp-3">{data.description}</p>{" "}
        </div>
        <div className="px-5 flex gap-3 w-full py-8">
          <div className="bg-[#404040] flex rounded-full items-center gap-3 px-3 py-1">
            <div className="rounded-full overflow-hidden w-5 h-5">
              <img
                className="h-full w-full object-cover"
                src={data.profileSrc}
                alt=""
              />
            </div>
            <span className="text-xs">{data.name}</span>
          </div>
          <div className="bg-[#404040] flex items-center gap-3 rounded-full px-3 py-1">
            <Timer size={13} />
            <span className="text-xs">{data.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewsCardDesktop;
