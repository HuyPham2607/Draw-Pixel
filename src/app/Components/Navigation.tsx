import React from "react";
import MiniMap from "./MiniMap";

type GridData = {
  dataPixel: any;
  dataZoom: any;
  dataScrollX: number;
  dataScrollY: number;
};
const Navigation: React.FC<GridData> = (props) => {
  return (
    <div className="w-1/6 bg-white">
      <MiniMap
        datafromGridPixel={props.dataPixel}
        zoom={props.dataZoom}
        scrollX={props.dataScrollX}
        scrollY={props.dataScrollY}
      />
    </div>
  );
};

export default Navigation;
