import React, { useEffect, useState } from "react";
import "./loader.css";

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 900);
  }, []);
  return (
    <>
      {showLoader ? (
        <div className="bg-[#1a2c38] fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-40">
          <div className="loader">
            <div className="ball"></div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Loader;
