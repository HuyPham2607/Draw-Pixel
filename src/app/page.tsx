"use client";
import React, { useState } from "react";
import Navigation from "./Components/Navigation";
import PixelGird from "./Components/PixelGird";
import SidebarTool from "./Components/SidebarTool";

export default function Home() {
  const [move, setMove] = useState(false);
  const [draw, setDraw] = useState(false);
  const [eraser, setEraser] = useState(false);
  const [line, setLine] = useState(false);
  const [brush, setBrush] = useState(false);
  const [bucket, setBucket] = useState(false);
  const [circle, setCircle] = useState(false);
  const [select, setSelect] = useState(false);
  const [text, setText] = useState(false);

  const HandelClickMove = (data: boolean) => {
    setMove(data);
  };
  const HandleClickDraw = (data: boolean) => {
    setDraw(data);
  };
  const HandleClickEraser = (data: boolean) => {
    setEraser(data);
  };
  const HandleClickLine = (data: boolean) => {
    setLine(data);
  };
  const HandleClickBrush = (data: boolean) => {
    setBrush(data);
  };
  const HandleClickBucket = (data: boolean) => {
    setBucket(data);
  };
  const HandleClickCircle = (data: boolean) => {
    setCircle(data);
  };
  const HandleClickSelect = (data: boolean) => {
    setSelect(data);
  };
  const HandleClickText = (data: boolean) => {
    setText(data);
  };

  return (
    <div className="flex h-full">
      <SidebarTool
        funcClickMove={HandelClickMove}
        funcClickDraw={HandleClickDraw}
        funcClickEraser={HandleClickEraser}
        funcClickLine={HandleClickLine}
        funcCLickBrush={HandleClickBrush}
        funcCLickBucket={HandleClickBucket}
        funcClickCircle={HandleClickCircle}
        funcClickSelect={HandleClickSelect}
        funcClickText={HandleClickText}
      />
      <PixelGird
        Move={move}
        Draw={draw}
        Eraser={eraser}
        Line={line}
        Brush={brush}
      />
      <Navigation />
    </div>
  );
}
