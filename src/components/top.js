import { useState } from "react";
import bfs from "../algorithms/bfs";
import "../other.css";
import DropBox from "./dropbox";
import VisualizeDFS from "../algorithms/dfs";
import { clearArray } from "./grid";
import dijkstra from "../algorithms/dijkstra";
import A_search from "../algorithms/Asearch";
import { GenenerateMaze } from "../algorithms/maze1";

const algorithms = ['Depth first search','Breadth first search','Dijkstra Algorithm','A* Search'];
const opt_speed = ['Default','Fast','Slow','Ultra Slow'];


export default function Top({gridArray,setArray,playing,setPlay,canvasRef})
{
  const [algorithm,setAlgorithm] = useState('Breadth first search');
  // const [maze,SetMaze] = useState('No maze');
  const [speed,SetSpeed] = useState('Default');

  return (
    <div className = 'flex custom-size:h-16 h-32 w-screen gap-4 items-center justify-center top relative z-30 custom-size:flex-row flex-col'>
      <div className = 'flex justify-content items-center gap-5' >
          <div className = 'text-xl font-medium cursor-pointer'>
            <DropBox data = {algorithms} state = {algorithm} setState={setAlgorithm} width={200}/>
          </div>
          <div className = 'text-xl font-medium cursor-pointer'>
            <DropBox data = {opt_speed} state = {speed} setState={SetSpeed} width={120}/>
          </div>

      </div>
      <div className = 'flex justify-content items-center gap-5'>
          <div className = 'text-xl font-medium cursor-pointer' onClick = {() => {if(!playing) {clearArray(gridArray,setArray,true,canvasRef)}}}>
            Clear
          </div>
          <div className = 'text-xl font-medium cursor-pointer' onClick = {() => {if(!playing) {clearArray(gridArray,setArray,true,canvasRef); GenenerateMaze(gridArray,setArray,setPlay)}}}>
            Maze
          </div>
          <div className = 'text-xl font-medium cursor-pointer' onClick = {() => {
            if (!playing)
            {
              clearArray(gridArray,setArray,false,canvasRef);
              if (algorithm === "Breadth first search")
              {
                setTimeout(() => {
                  bfs(gridArray,setArray,setPlay,speed,canvasRef)
                },50);
              }
              else if(algorithm === "Depth first search")
              {
                setTimeout(() => {
                  VisualizeDFS(gridArray,setArray,setPlay,speed,canvasRef)
                },50);
              }
              else if(algorithm === "Dijkstra Algorithm")
              {
                setTimeout(() => {
                  dijkstra(gridArray,setArray,setPlay,speed,canvasRef)
                },50);
              }
              else if(algorithm === "A* Search")
              {
                setTimeout(() => {
                  A_search(gridArray,setArray,setPlay,speed,canvasRef)
                },50);
              }
            }
          }
          }>
            Play
          </div>

      </div>
    </div>);

}