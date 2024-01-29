import { useRef, useState } from "react";
import DrawGrid from "./components/grid";
import Top from "./components/top";

export default function Visualizer () {
  const [gridArray,setArray] = useState(null);
  const [playing,setPlay] = useState(false);
  const canvasRef = useRef(null);
  return (
    <>
      <div className = 'w-screen h-screen flex flex-col items-center justify-between'>
        <Top gridArray={gridArray} setArray={setArray} playing = {playing} setPlay = {setPlay} canvasRef = {canvasRef}/>
        <DrawGrid gridArray={gridArray} setArray={setArray} playing = {playing} canvasRef = {canvasRef}/>
      </div>
    
    </>
  );
}