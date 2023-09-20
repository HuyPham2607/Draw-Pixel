// MiniMap.tsx
import React, { useEffect, useRef, useState } from "react";

type MiniMapProps = {
  datafromGridPixel: any;
  zoom: any;
  scrollX: number;
  scrollY: number;
};

const MiniMap: React.FC<MiniMapProps> = (props) => {
  const gridSize = 50;
  const frameSize = 50;

  // Tính toán zoom và vị trí khung
  const frameWidth = (frameSize / gridSize) * (100 / props.zoom);
  const frameHeight = (frameSize / gridSize) * (100 / props.zoom);

  // Tính toán vị trí sao cho khung nằm ở giữa MiniMap theo chiều ngang và chiều dọc
  const frameLeft = (100 - frameWidth) / 2;
  const frameTop = (100 - frameHeight) / 2;

  const miniMapStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
  };

  const miniMapFrameStyle: React.CSSProperties = {
    position: "absolute",
    top: `${frameTop}%`,
    left: `${frameLeft}%`,
    width: `${frameWidth}%`,
    height: `${frameHeight}%`,
    border: "1px solid red",
    pointerEvents: "none",
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full">
        <div>
          <div className="mini-map p-3" style={miniMapStyle}>
            <div className="mini-map-frame" style={miniMapFrameStyle}></div>

            {props.datafromGridPixel &&
            Array.isArray(props.datafromGridPixel) ? (
              props.datafromGridPixel.map((row: string[], y: number) => (
                <div key={y} className="flex w-full h-full">
                  {row.map((color: string, x: number) => (
                    <div
                      key={`${y}-${x}`}
                      className="flex-grow flex-shrink w-1 h-1 grid-hover"
                      style={{
                        backgroundColor: color,
                      }}
                    ></div>
                  ))}
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMap;
