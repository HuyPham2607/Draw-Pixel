"use client";
import React, { useState } from "react";
import Navigation from "./Components/Navigation";
import PixelGird from "./Components/PixelGird";
import SidebarTool from "./Components/SidebarTool";

export default function Home() {
  const [move, setMove] = useState(false);
  const [draw, setDraw] = useState(false);
  const [eraser, setEraser] = useState(false);

  const HandelClickMove = (data: boolean) => {
    setMove(data);
  };
  const HandleClickDraw = (data: boolean) => {
    setDraw(data);
  };
  const HandleClickEraser = (data: boolean) => {
    setEraser(data);
  };

  return (
    <div className="flex h-full">
      <SidebarTool
        funcClickMove={HandelClickMove}
        funcClickDraw={HandleClickDraw}
        funcClickEraser={HandleClickEraser}
      />
      <PixelGird Move={move} Draw={draw} Eraser={eraser} />
      <Navigation />
    </div>
  );
}
