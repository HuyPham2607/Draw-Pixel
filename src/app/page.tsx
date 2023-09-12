"use client";
import React, { useState } from "react";
import Navigation from "./Components/Navigation";
import PixelGird from "./Components/PixelGird";
import SidebarTool from "./Components/SidebarTool";

export default function Home() {
  const [move, setMove] = useState(false);

  const HandelClickMove = (data: boolean) => {
    setMove(data);
  };

  return (
    <div className="flex h-full">
      <SidebarTool funcClickMove={HandelClickMove} />
      <PixelGird Move={move} />
      <Navigation />
    </div>
  );
}
