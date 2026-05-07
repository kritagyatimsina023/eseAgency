const NewsCard = ({ data }) => {
  return (
    <div className="flex bg-[#262626] gap-2 rounded-lg h-32 sm:h-40 md:h-48 lg:h-55 items-center">
      {/* Image — narrows on small screens, expands on larger */}
      <div className="h-full w-24 sm:w-32 md:w-36 lg:w-40 flex-shrink-0 rounded-l-lg overflow-hidden">
        <img className="h-full w-full object-cover" src={data.src} alt="" />
      </div>
      {/* Text content */}
      <div className="flex-1 flex flex-col px-2 sm:px-3 gap-1 min-w-0">
        <h4 className="text-[#9B9B9B] text-xs sm:text-sm md:text-md truncate">
          {data.newsTitle}
        </h4>
        <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold leading-snug line-clamp-2 sm:line-clamp-3 max-w-full md:max-w-[90%] lg:max-w-[82%]">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
