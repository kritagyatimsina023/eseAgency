const Description = ({ text }) => {
  return (
    <div className="space-x-30 overflow-hidden md:px-7">
      <span className="text-[22px]">This is ESE</span>
      <span
        className="
          font-suisse
          font-light
          transition-all
          duration-300
          ease-linear
          text-[30px]
          md:text-[3.5rem]
        "
      >
        {text}
      </span>
    </div>
  );
};

export default Description;
