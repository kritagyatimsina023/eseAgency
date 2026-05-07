import React from "react";

const Container = ({ children }) => {
  return (
    <section className="max-w-7xl mx-auto relative z-10 bg-black">
      {children}
    </section>
  );
};

export default Container;
