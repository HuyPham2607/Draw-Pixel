"use client";
import React, { useState } from "react";

const PixelGrid: React.FC = () => {
  // Số lượng pixel trong lưới và mảng lưu trữ màu sắc của từng pixel
  const gridSize = 10; // Số lượng pixel theo chiều ngang và dọc
  const [pixels, setPixels] = useState<string[][]>(
    Array.from({ length: gridSize }, (_, y) =>
      Array.from({ length: gridSize }, (_, x) =>
        (x + y) % 2 === 0 ? "#ffffff" : "#cccccc"
      )
    )
  );

  // Hàm xử lý khi nhấp chuột vào pixel
  const handlePixelClick = (x: number, y: number) => {
    const newPixels = [...pixels];
    newPixels[y][x] = "#000000"; // Đặt màu sắc của pixel thành đen
    setPixels(newPixels);
  };

  return (
    <div className="grow h-full bg-white border-dotted border-2 border-sky-500">
      <div className="grid grid-cols-16 gap-0">
        {pixels.map((row, y) => (
          <div key={y} className="flex">
            {row.map((color, x) => (
              <div
                key={x}
                className={`w-5 h-5 cursor-pointer ${x !== 0 ? "" : ""}`}
                style={{
                  backgroundColor: color,
                  width: `calc(100% - ${gridSize} - 1px`,
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
