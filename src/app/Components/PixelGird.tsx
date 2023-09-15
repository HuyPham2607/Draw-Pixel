import React, { useState } from "react";

type PixelGridProps = {
  Move: boolean;
  Draw: boolean;
  Eraser: boolean;
  Line: boolean;
  Brush: boolean;
};

const PixelGrid = (props: PixelGridProps) => {
  const gridSize = 50;
  const maxZoom = 3;

  const [zoom, setZoom] = useState(1);
  const [pixels, setPixels] = useState<string[][]>(
    Array.from({ length: gridSize }, (_, y) =>
      Array.from({ length: gridSize }, (_, x) =>
        (x + y) % 2 === 0 ? "#ffff" : "#e5e7eb"
      )
    )
  );

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const [isSelectingStartPoint, setIsSelectingStartPoint] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(
    null
  );

  const [currentColor, setCurrentColor] = useState("#000000");

  const [hoveredPoints, setHoveredPoints] = useState<
    { x: number; y: number }[] | null
  >(null);

  // Thêm hàm này để đặt lại startPoint và endPoint về null.
  const resetLine = () => {
    setStartPoint(null);
    setEndPoint(null);
  };

  // Thêm một biến tạm thời để lưu trạng thái vẽ đường thẳng.
  const [isDrawingLine, setIsDrawingLine] = useState(false);

  // Trong hàm handlePixelClick:
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
    } else if (props.Line) {
      if (startPoint === null) {
        setStartPoint({ x, y });
        setEndPoint(null);
        const newPixels = pixels.map((row) => [...row]);
        newPixels[y][x] = "blue";
        setPixels(newPixels);
        if (hoveredPoints) {
          hoveredPoints.forEach(({ x, y }) => {
            newPixels[y][x] = (x + y) % 2 === 0 ? "#ffff" : "#e5e7eb";
          });
          setHoveredPoints(null);
        }
      } else if (endPoint === null) {
        setEndPoint({ x, y });
        const newPixels = pixels.map((row) => [...row]);
        drawLine(startPoint.x, startPoint.y, x, y, newPixels);
        setPixels(newPixels);
        resetLine();
        if (hoveredPoints) {
          hoveredPoints.forEach(({ x, y }) => {
            newPixels[y][x] = (x + y) % 2 === 0 ? "#ffff" : "#e5e7eb";
          });
          setHoveredPoints(null);
        }
      } else {
        // Thêm một đoạn thẳng thứ hai mà không xóa điểm thẳng thứ nhất.
        const newPixels = pixels.map((row) => [...row]);
        drawLine(startPoint.x, startPoint.y, x, y, newPixels);
        setPixels(newPixels);
        resetLine();
      }
    }

    setPixels(newPixels);
  };

  const handlePixelHover = (x: number, y: number) => {
    if (startPoint !== null && endPoint === null) {
      const newPixels = pixels.map((row) => [...row]);

      if (hoveredPoints) {
        hoveredPoints.forEach(({ x, y }) => {
          newPixels[y][x] = (x + y) % 2 === 0 ? "#ffff" : "#e5e7eb";
        });
      }

      const pointsOnLine = getPointsOnLine(startPoint.x, startPoint.y, x, y);
      pointsOnLine.forEach(({ x, y }) => {
        newPixels[y][x] = "green";
      });

      setPixels(newPixels);
      setHoveredPoints(pointsOnLine);
    }
  };

  const drawLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    pixelsArray: string[][],
    color: string = currentColor
  ) => {
    const pointsOnLine = getPointsOnLine(x1, y1, x2, y2);
    pointsOnLine.forEach(({ x, y }) => {
      if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
        pixelsArray[y][x] = color;
      }
    });
  };

  const getPointsOnLine = (x1: number, y1: number, x2: number, y2: number) => {
    const points: { x: number; y: number }[] = [];
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;
    let currentX = x1;
    let currentY = y1;

    while (currentX !== x2 || currentY !== y2) {
      points.push({ x: currentX, y: currentY });
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        currentX += sx;
      }
      if (e2 < dx) {
        err += dx;
        currentY += sy;
      }
    }
    return points;
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = zoom + delta;
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
        setScrollX(scrollX + deltaX);
        setScrollY(scrollY + deltaY);
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
              {row.map((color, x) => {
                const isHovered =
                  hoveredPoints &&
                  hoveredPoints.some((point) => point.x === x && point.y === y);

                return (
                  <div
                    key={x}
                    className={`w-4 h-4 ${isHovered ? "green" : ""} grid-hover`}
                    style={{
                      backgroundColor: isHovered ? "green" : color,
                    }}
                    onClick={() => handlePixelClick(x, y)}
                    onMouseMove={(e) => handlePixelDrag(e, x, y)}
                    onMouseEnter={() => handlePixelHover(x, y)}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <input type="color" value={currentColor} onChange={handleColorChange} />
    </div>
  );
};

export default PixelGrid;
