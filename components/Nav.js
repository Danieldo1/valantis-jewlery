"use client";
import React from "react";
import Image from "next/image";

const Nav = () => {
  return (
    <header className="flex justify-center p-5  fixed top-0 bg-white/90 w-full ">
      <div className="flex items-center">
        <Image src="/logo.svg" alt="logo" height={50} width={50} />
        <p className="font-black text-3xl">ValantisJewelery</p>
      </div>
    </header>
  );
};

export default Nav;
