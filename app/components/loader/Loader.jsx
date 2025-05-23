import React from "react";

const Loader = ({ isLoading }) => {
  return (
    <div
      className={`${
        isLoading ? "block" : "hidden"
      } overlay fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center`}
    >
      <div className="loader mt-80"></div>
    </div>
  );
};

export default Loader;
