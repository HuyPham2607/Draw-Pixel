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
  funcClickMove: (data: any) => void;
};

function SidebarTool(props: Home) {
  const [move, setMove] = useState(false);

  const HandleClickMove = () => {
    const newMove = !move;
    setMove(newMove);
    props.funcClickMove(newMove);
  };

  return (
    <div className=" bg-white max-w-[150px]">
      <h1 className="text-center bg-black">Tool</h1>
      <div className="grid grid-cols-2">
        <button className="hover:bg-zinc-200">
          <Image className="w-16 p-2" src={Pencil} alt="" />
        </button>
        <button className="hover:bg-zinc-200">
          <Image className="w-16 p-2" src={Eraser} alt="" />
        </button>
        <button className="hover:bg-zinc-200">
          <Image className="w-16 p-2" src={Brush} alt="" />
        </button>
        <button className="hover:bg-zinc-200">
          <Image className="w-16 p-2" src={Line} alt="" />
        </button>
        <button className="hover:bg-zinc-200">
          <Image className="w-16 p-2" src={FillColor} alt="" />
        </button>
        <button className="hover:bg-zinc-200">
          <Image className="w-16 p-2" src={Circle} alt="" />
        </button>
        <button className="hover:bg-zinc-200" onClick={HandleClickMove}>
          <Image className="w-16 p-2" src={Move} alt="" />
        </button>
        <button className="hover:bg-zinc-200">
          <Image className="w-16 p-2" src={Select} alt="" />
        </button>
        <button className="hover:bg-zinc-200">
          <Image className="w-16 p-2" src={Text} alt="" />
        </button>
      </div>
    </div>
  );
}

export default SidebarTool;
