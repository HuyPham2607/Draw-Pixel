"use client";
import React, { useState } from "react";

const PixelGrid: React.FC = () => {
  const gridSize = 100;
  const pixelSize = 2;

  const [zoom, setZoom] = useState(1);
  const [pixels, setPixels] = useState<string[][]>(
    Array.from({ length: gridSize }, (_, y) =>
      Array.from({ length: gridSize }, (_, x) =>
        (x + y) % 2 === 0 ? "bg-zinc" : "bg-zinc-300"
      )
    )
  );

  const handlePixelClick = (x: number, y: number) => {
    const newPixels = [...pixels];
    newPixels[y][x] = "#000000";
    setPixels(newPixels);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prevZoom) => Math.max(0.1, prevZoom + delta));
  };

  const pixelGridStyle: React.CSSProperties = {
    transform: `scale(${zoom})`,
    transformOrigin: "center center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto", // Thêm thanh cuộn khi nội dung vượt ra ngoài
  };

  return (
    <div
      className="bg-white border-dotted border-2 border-sky-500"
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        className="pixel-grid"
        style={{
          ...pixelGridStyle,
          height: "90vh",
        }}
        onWheel={handleWheel}
      >
        <div className={`grid grid-cols-${gridSize} gap-0`}>
          {pixels.map((row, y) => (
            <div key={y} className="flex group">
              {row.map((color, x) => (
                <div
                  key={x}
                  className={`w-2 h-2 ${color} grid-hover`}
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={() => handlePixelClick(x, y)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PixelGrid;
