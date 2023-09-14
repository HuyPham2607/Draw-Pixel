"use client";

import React, { useState } from "react";

type PixelGridProps = {
  Move: boolean;
  Draw: boolean;
  Eraser: boolean;
  Line: boolean;
  Brush: boolean;
};

const PixelGrid = (props: PixelGridProps) => {
  // Định nghĩa thành phần PixelGrid và truyền vào các prop.
  const gridSize = 50; // Kích thước của grid pixel.
  const maxZoom = 3; // Giới hạn tối đa cho việc zoom.

  // Sử dụng useState hook để quản lý state cho grid pixel và các biến khác.
  const [zoom, setZoom] = useState(1); // State để lưu giá trị zoom.
  const [pixels, setPixels] = useState<string[][]>(
    // State để lưu trạng thái của grid pixel với màu sắc ban đầu.
    Array.from({ length: gridSize }, (_, y) =>
      Array.from({ length: gridSize }, (_, x) =>
        (x + y) % 2 === 0 ? "#ffff" : "#e5e7eb"
      )
    )
  );

  const [isDragging, setIsDragging] = useState(false); // State để theo dõi trạng thái của việc di chuyển.
  const [startX, setStartX] = useState(0); // Vị trí x ban đầu khi di chuột.
  const [startY, setStartY] = useState(0); // Vị trí y ban đầu khi di chuột.
  const [scrollX, setScrollX] = useState(0); // Lưu giá trị cuộn theo trục x.
  const [scrollY, setScrollY] = useState(0); // Lưu giá trị cuộn theo trục y.

  const [currentColor, setCurrentColor] = useState("#000000"); // Lưu giá trị màu sắc hiện tại.

  // Xử lý sự kiện khi người dùng nhấp vào một pixel.
  const handlePixelClick = (x: number, y: number) => {
    // Tạo một bản sao mới của mảng pixels để thay đổi.
    const newPixels = pixels.map((row) => [...row]);

    if (props.Draw) {
      // Vẽ pixel mới bằng màu hiện tại.
      newPixels[y][x] = currentColor;
    } else if (props.Eraser) {
      // Xóa pixel bằng màu nền.
      newPixels[y][x] = (x + y) % 2 === 0 ? "#ffff" : "#e5e7eb";
    } else if (props.Brush) {
      // Tô màu cho ô được chọn và các ô xung quanh theo hình dạng dấu cộng.
      const crossOffsets = [
        { dx: 0, dy: 0 }, // Ô được chọn.
        { dx: -1, dy: 0 }, // Bên trái.
        { dx: 1, dy: 0 }, // Bên phải.
        { dx: 0, dy: -1 }, // Phía trên.
        { dx: 0, dy: 1 }, // Phía dưới.
      ];

      for (const offset of crossOffsets) {
        const newX = x + offset.dx;
        const newY = y + offset.dy;

        if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
          newPixels[newY][newX] = currentColor;
        }
      }
    }

    // Cập nhật state pixels với mảng mới đã thay đổi.
    setPixels(newPixels);
  };

  // Xử lý sự kiện cuộn chuột để thay đổi zoom.
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = zoom + delta;

    // Kiểm tra giới hạn zoom.
    if (newZoom >= 1 && newZoom <= maxZoom) {
      setZoom(newZoom);
    }
  };

  // Xử lý sự kiện khi người dùng nhấp chuột để di chuyển.
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      setIsDragging(true);
      setStartX(e.clientX);
      setStartY(e.clientY);
    }
  };

  // Xử lý sự kiện khi người dùng di chuyển chuột.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.Move) {
      if (isDragging) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // Áp dụng sự chênh lệch vào vị trí hiển thị của bức tranh.
        setScrollX(scrollX + deltaX);
        setScrollY(scrollY + deltaY);

        // Lưu vị trí hiện tại của chuột.
        setStartX(e.clientX);
        setStartY(e.clientY);
      }
    }
  };

  // Xử lý sự kiện khi người dùng thả chuột.
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Xử lý sự kiện khi người dùng di chuyển pixel để vẽ hoặc xóa.
  const handlePixelDrag = (
    e: React.MouseEvent<HTMLDivElement>,
    x: number,
    y: number
  ) => {
    if (isDragging) {
      if (props.Draw || props.Brush) {
        // Kiểm tra xem pixelX và pixelY có nằm trong phạm vi hợp lệ và vẽ pixel mới.
        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
          handlePixelClick(x, y);
        }
      } else if (props.Eraser) {
        // Kiểm tra xem pixelX và pixelY có nằm trong phạm vi hợp lệ và xóa pixel.
        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
          const newPixels = [...pixels];
          newPixels[y][x] = (x + y) % 2 === 0 ? "#ffff" : "#e5e7eb";
          setPixels(newPixels);
        }
      }
    }
  };

  // Xử lý sự kiện khi người dùng thay đổi màu sắc.
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(e.target.value);
  };

  // Định dạng và kiểu dáng của grid pixel dựa trên giá trị zoom và di chuyển.
  const pixelGridStyle: React.CSSProperties = {
    transform: `scale(${zoom}) translate(${scrollX}px, ${scrollY}px)`,
    transformOrigin: "center center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
  };

  // Trả về JSX để hiển thị grid pixel và bảng màu.
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
