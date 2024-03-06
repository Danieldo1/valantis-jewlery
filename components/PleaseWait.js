"use client";

import React, { useState, useEffect } from "react";

const PleaseWait = () => {
  const [dots, setDots] = useState("");
  const dotsArray = [".", "..", "..."];
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        const nextIndex = (dotsArray.indexOf(prevDots) + 1) % dotsArray.length;
        return dotsArray[nextIndex];
      });
    }, 500);

    return () => clearInterval(interval);
  }, [dotsArray]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setShowText((prevShowText) => !prevShowText);
    }, 2000);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <div className="flex flex-row justify-center ml-10 mt-5">
      <p className="text-center">Loading </p>
      <p className="w-10">

      {showText && <span>{dots}</span>}
      </p>
    </div>
  );
};

export default PleaseWait;
