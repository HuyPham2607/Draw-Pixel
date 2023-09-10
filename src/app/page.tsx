import Navigation from "./Components/Navigation";
import PixelGird from "./Components/PixelGird";
import SidebarTool from "./Components/SidebarTool";

export default function Home() {
  return (
    <div className="flex h-full">
      <SidebarTool />
      <PixelGird />
      <Navigation />
    </div>
  );
}
