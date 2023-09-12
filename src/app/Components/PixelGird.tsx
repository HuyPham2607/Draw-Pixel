"use client";
import React, { useState } from "react";

type PixelGridProps = {
  Move: boolean;
};
const PixelGrid = (props: PixelGridProps) => {
  const gridSize = 50;
  const maxZoom = 3;
  const [zoom, setZoom] = useState(1);
  const [pixels, setPixels] = useState<string[][]>(
    Array.from({ length: gridSize }, (_, y) =>
      Array.from({ length: gridSize }, (_, x) =>
        (x + y) % 2 === 0 ? "bg-zinc" : "bg-zinc-300"
      )
    )
  );

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const [currentColor, setCurrentColor] = useState("#000000");

  const handlePixelClick = (x: number, y: number) => {
    const newPixels = [...pixels];
    newPixels[y][x] = currentColor;
    setPixels(newPixels);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = zoom + delta;

    // Kiểm tra giới hạn zoom
    if (newZoom >= 1 && newZoom <= maxZoom) {
      setZoom(newZoom);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      setIsDragging(true);
      setStartX(e.clientX);
      setStartY(e.clientY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.Move) {
      if (isDragging) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // Áp dụng sự chênh lệch vào vị trí hiển thị của bức tranh
        setScrollX(scrollX + deltaX);
        setScrollY(scrollY + deltaY);

        // Lưu vị trí hiện tại của chuột
        setStartX(e.clientX);
        setStartY(e.clientY);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePixelDrag = (
    e: React.MouseEvent<HTMLDivElement>,
    x: number,
    y: number
  ) => {
    if (isDragging) {
      // Kiểm tra xem pixelX và pixelY có nằm trong phạm vi hợp lệ
      if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
        handlePixelClick(x, y);
      }
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(e.target.value);
  };

  const pixelGridStyle: React.CSSProperties = {
    transform: `scale(${zoom}) translate(${scrollX}px, ${scrollY}px)`,
    transformOrigin: "center center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
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
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className={`grid grid-cols-${gridSize} gap-0`}>
          {pixels.map((row, y) => (
            <div key={y} className="flex group">
              {row.map((color, x) => (
                <div
                  key={x}
                  className={`w-4 h-4 ${color} grid-hover`}
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={() => handlePixelClick(x, y)}
                  onMouseMove={(e) => handlePixelDrag(e, x, y)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <input type="color" value={currentColor} onChange={handleColorChange} />
    </div>
  );
};

export default PixelGrid;
