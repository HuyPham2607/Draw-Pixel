"use client";
import React, { useState } from "react";

const PixelGrid: React.FC = () => {
  const gridSize = 100; // Thay đổi số lượng ô trong gridSize
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
    const delta = e.deltaY > 0 ? -0.1 : 0.1; // Điều chỉnh delta tùy theo tốc độ bạn muốn
    setZoom((prevZoom) => Math.max(0.1, prevZoom + delta));
  };

  return (
    <div
      className="flex-grow bg-white border-dotted border-2 border-sky-500 over"
      style={{
        height: "90vh",
        minHeight: "90vh",
        transform: `scale(${zoom})`, // Điều chỉnh tỷ lệ thu phóng tại đây
        transformOrigin: "top left", // Đặt điểm neo ở góc trên bên trái
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
  );
};

export default PixelGrid;
