"use client";
import React, { useEffect, useState } from "react";

type PixelGridProps = {
  Move: boolean;
  Draw: boolean;
  Eraser: boolean;
  Line: boolean;
  Brush: boolean;
  funcGetDataPixel: (data: any) => void;
  funcGetDataZoom: (data: any) => void;
  funcGetScrollX: (data: any) => void;
  funcGetScrollY: (data: any) => void;
};

const PixelGrid: React.FC<PixelGridProps> = (props) => {
  const gridSize = 50;
  const maxZoom = 3;

  const [zoom, setZoom] = useState<number>(1);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [scrollX, setScrollX] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);

  const [pixels, setPixels] = useState<string[][]>(
    Array.from({ length: gridSize }, (_, y) =>
      Array.from({ length: gridSize }, (_, x) =>
        (x + y) % 2 === 0 ? "#ffff" : "#e5e7eb"
      )
    )
  );

  useEffect(() => {
    props.funcGetDataPixel(pixels);
    props.funcGetDataZoom(zoom);
    props.funcGetScrollX(scrollX);
    props.funcGetScrollY(scrollY);
  }, [pixels, zoom, scrollX, scrollY]);

  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );

  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(
    null
  );

  const [currentColor, setCurrentColor] = useState<string>("#000000");

  const handlePixelClick = (x: number, y: number) => {
    const newPixels = pixels.map((row) => [...row]);

    if (props.Draw) {
      newPixels[y][x] = currentColor;
    } else if (props.Eraser) {
      newPixels[y][x] = (x + y) % 2 === 0 ? "#ffff" : "#e5e7eb";
    } else if (props.Brush) {
      const crossOffsets = [
        { dx: 0, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 },
      ];

      for (const offset of crossOffsets) {
        const newX = x + offset.dx;
        const newY = y + offset.dy;

        if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
          newPixels[newY][newX] = currentColor;
        }
      }
    }

    setPixels(newPixels);
  };

  const drawLine = (
    pixelsArray: string[][],
    x1: number | null,
    y1: number | null,
    x2: number | null,
    y2: number | null,
    color: string
  ) => {
    if (x1 === null || y1 === null || x2 === null || y2 === null) {
      return;
    }

    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      pixelsArray[y1][x1] = color;

      if (x1 === x2 && y1 === y2) {
        break;
      }

      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }
    }
  };

  const handleDrawLineStart = (
    e: React.MouseEvent<HTMLDivElement>,
    x: number,
    y: number
  ) => {
    if (props.Line) {
      if (startPoint === null) {
        setIsHovered(true);
        setStartPoint({ x, y });
        setEndPoint(null);
      }
    }
  };

  const handleDrawLineEnd = (
    e: React.MouseEvent<HTMLDivElement>,
    x: number,
    y: number
  ) => {
    const newPixels = pixels.map((row) => [...row]);
    if (startPoint !== null && endPoint === null) {
      drawLine(newPixels, startPoint.x, startPoint.y, x, y, currentColor);
    }
    setPixels(newPixels);
    setStartPoint(null);
  };

  function calculateLine(startPoint: any, endPoint: any) {
    if (props.Line && isDragging) {
      console.log(startPoint, endPoint);
      console.log(isHovered);
    }
  }

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = zoom + delta;
    if (newZoom >= 1 && newZoom <= maxZoom) {
      setZoom(newZoom);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.Move) {
      if (isDragging) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        setScrollX(scrollX + deltaX);
        setScrollY(scrollY + deltaY);
        setStartX(e.clientX);
        setStartY(e.clientY);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      setIsDragging(true);
      setStartX(e.clientX);
      setStartY(e.clientY);
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
      if (props.Draw || props.Brush) {
        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
          handlePixelClick(x, y);
        }
      } else if (props.Eraser) {
        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
          const newPixels = [...pixels];
          newPixels[y][x] = (x + y) % 2 === 0 ? "#ffff" : "#e5e7eb";
          setPixels(newPixels);
        }
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
      className="bg-white border-dotted border-2"
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
                  onMouseDown={(e) => handleDrawLineStart(e, x, y)}
                  onMouseUp={(e) => handleDrawLineEnd(e, x, y)}
                  onMouseEnter={() => calculateLine(x, y)}
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
