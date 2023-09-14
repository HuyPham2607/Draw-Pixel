"use client";
import Image from "next/image";
import React, { useState } from "react";
import Eraser from "../../../public/eraser.png";
import Pencil from "../../../public/icons8-pencil-100.png";
import Brush from "../../../public/icons8-brush-100.png";
import Circle from "../../../public/icons8-circle-100.png";
import FillColor from "../../../public/icons8-fill-color-100.png";
import Move from "../../../public/icons8-move-96.png";
import Select from "../../../public/icons8-select-96.png";
import Text from "../../../public/icons8-text-tool-64.png";
import Line from "../../../public/icons8-line-100.png";

type Home = {
  funcClickMove: (data: boolean) => void;
  funcClickDraw: (data: boolean) => void;
  funcClickEraser: (data: boolean) => void;
  funcClickLine: (data: boolean) => void;
  funcCLickBrush: (data: boolean) => void;
  funcCLickBucket: (data: boolean) => void;
  funcClickCircle: (data: boolean) => void;
  funcClickSelect: (data: boolean) => void;
  funcClickText: (data: boolean) => void;
};

enum Tool {
  Move = "move",
  Draw = "draw",
  Brush = "brush",
  Eraser = "eraser",
  Line = "line",
  Bucket = "bucket",
  Circle = "circle",
  Select = "select",
  Text = "text",
}

function SidebarTool(props: Home) {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const handleToolClick = (tool: Tool) => {
    setActiveTool(tool);
    props.funcClickMove(false);
    props.funcClickDraw(false);
    props.funcClickEraser(false);
    props.funcCLickBrush(false);
    props.funcClickLine(false);
    props.funcClickCircle(false);
    props.funcCLickBucket(false);
    props.funcClickSelect(false);
    props.funcClickText(false);

    switch (tool) {
      case Tool.Move:
        props.funcClickMove(true);
        break;
      case Tool.Draw:
        props.funcClickDraw(true);
        break;
      case Tool.Eraser:
        props.funcClickEraser(true);
        break;
      case Tool.Line:
        props.funcClickLine(true);
        break;
      case Tool.Brush:
        props.funcCLickBrush(true);
        break;
      case Tool.Circle:
        props.funcClickCircle(true);
        break;
      case Tool.Bucket:
        props.funcCLickBucket(true);
        break;
      case Tool.Select:
        props.funcClickSelect(true);
        break;
      case Tool.Text:
        props.funcClickText(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="  w-[170px] bg-zinc-200">
      <h1 className="h-6 flex justify-center align-middle text-black text-2xl font-sans">
        Tools
      </h1>
      <div className="grid grid-cols-2 px-1 py-1">
        <button
          className={
            activeTool == "draw"
              ? "border-slate-950 border bg-blue-500"
              : "" + "hover:bg-zinc-300"
          }
          onClick={() => handleToolClick(Tool.Draw)}
        >
          <Image className="w-full p-2" src={Pencil} alt="" />
        </button>
        <button
          className={
            activeTool == "eraser"
              ? "border-slate-950 border bg-blue-500"
              : "" + "hover:bg-zinc-200"
          }
          onClick={() => handleToolClick(Tool.Eraser)}
        >
          <Image className="w-full p-2" src={Eraser} alt="" />
        </button>
        <button
          className={
            activeTool == "brush"
              ? "border-slate-950 border bg-blue-500"
              : "" + "hover:bg-zinc-200"
          }
          onClick={() => handleToolClick(Tool.Brush)}
        >
          <Image className="w-full p-2" src={Brush} alt="" />
        </button>
        <button
          className={
            activeTool == "line"
              ? "border-slate-950 border bg-blue-500"
              : "" + "hover:bg-zinc-200"
          }
          onClick={() => handleToolClick(Tool.Line)}
        >
          <Image className="w-full p-2" src={Line} alt="" />
        </button>
        <button
          className={
            activeTool == "bucket"
              ? "border-slate-950 border bg-blue-500"
              : "" + "hover:bg-zinc-200"
          }
          onClick={() => handleToolClick(Tool.Bucket)}
        >
          <Image className="w-full p-2" src={FillColor} alt="" />
        </button>
        <button
          className={
            activeTool == "circle"
              ? "border-slate-950 border bg-blue-500"
              : "" + "hover:bg-zinc-200"
          }
          onClick={() => handleToolClick(Tool.Circle)}
        >
          <Image className="w-full p-2" src={Circle} alt="" />
        </button>
        <button
          className={
            activeTool == "move"
              ? "border-slate-950 border bg-blue-500"
              : "" + "hover:bg-zinc-200"
          }
          onClick={() => handleToolClick(Tool.Move)}
        >
          <Image className="w-full p-2" src={Move} alt="" />
        </button>
        <button
          className={
            activeTool == "select"
              ? "border-slate-950 border bg-blue-500"
              : "" + "hover:bg-zinc-200"
          }
          onClick={() => handleToolClick(Tool.Select)}
        >
          <Image className="w-full p-2" src={Select} alt="" />
        </button>
        <button
          className={
            activeTool == "text"
              ? "border-slate-950 border bg-blue-500"
              : "" + "hover:bg-zinc-200"
          }
          onClick={() => handleToolClick(Tool.Text)}
        >
          <Image className="w-full p-2" src={Text} alt="" />
        </button>
      </div>
    </div>
  );
}

export default SidebarTool;
