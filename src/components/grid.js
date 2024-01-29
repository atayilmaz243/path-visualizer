import {useEffect, useRef, useState } from "react";
import {SrcSvg,DstSvg } from "./svg";
import "../animation.css";

let gridSize = (window.innerWidth > 590) ? {r:Math.floor((window.innerHeight-64)/32) ,c:Math.floor(window.innerWidth/32)} : {r:Math.floor((window.innerHeight-128)/32) ,c:Math.floor(window.innerWidth/32)};
let start = {r:5,c:10};
let end = {r:5,c:20};

// function check(gridArray)
// {
//   for (let r=0 ; gridSize.r>r ;r++)
//   {
//     for (let c=0 ; gridSize.c>c ; c++)
//     {
//       if (gridArray[r][c] === 1)
//       {
//         console.log('src => ' + r + ' ' + c);
//       }
//     }
//   }
//   console.log('aaaa');
// }


function FillCell({cord,move,gridArray})
{
  const type = gridArray[cord.r][cord.c];
  switch (type) {
    case 0:
      return null;
    case 1:
      // console.log(move);
      if (move !== 1) return <div className="w-8 h-8"> <SrcSvg /></div>;
      else return null;
    case 2:
      if (move !== 2) return <div className = "w-8 h-8 "> <DstSvg /> </div>;
      else return null;
    case 3:
      return <div className = 'w-8 h-8 obstacle bg-neutral-700 absolute box-content border rounded-sm border-gray-500'></div>
    case -1:
      return <div className = 'w-8 h-8 path2 absolute'></div>
    case -2:
      return <div className = 'w-8 h-8 absolute notfound absolute border border-red-400'></div>
    default:
      return <div className = 'w-8 h-8 path border absolute rounded-sm border-sky-200 '></div>
  }
}

function FillCell2({move})
{
  switch (move) {
    case 1:
      return <SrcSvg />;
    case 2:
      return <DstSvg />;
    default: // 
      return null;
  }
}

function handleClick(cord,gridArray,setArray,move,setMove,isMouseDown)
{
  // console.log('click');
  const type = gridArray[cord.r][cord.c];
  if (move === 1)
  {
    if (type !== 1)
    {
      const cpy = gridArray.slice();
      cpy[start.r][start.c] = type;
      cpy[cord.r][cord.c] = 1;

      if (cord.r === end.r && cord.c === end.c)
      {
        end = {...start};
      }
      start = {...cord};

      setArray(cpy);

    }
    setMove(0);
  }
  else if (move === 2)
  {
    if (type !== 2)
    {
      const cpy = gridArray.slice();
      cpy[end.r][end.c] = type;
      cpy[cord.r][cord.c] = 2;

      if (cord.r === start.r && cord.c === start.c)
      {
        start = {...end};
      }
      end = {...cord};
      setArray(cpy);
    }
    setMove(0);
  }
  else
  {
    if(type === 1)
    {
      setMove(1);
    }
    else if(type === 2)
    {
      setMove(2);
    }
  }
}

function GridCell({cord,move,setMove,gridArray,setArray,hover,setHover,isMouseDown,playing})
{
  const ableToChange = useRef(true);


  const handleTouch = () => {
    if (playing || (cord.r == start.r && cord.c == start.c) || (cord.r == end.r && cord.c == end.c))
      return;
    
    const cpy = gridArray.slice();
    if (gridArray[cord.r][cord.c] === 3)
    {
      cpy[cord.r][cord.c] = 0;
    }
    else
    {
      cpy[cord.r][cord.c] = 3;
    }
    setArray(cpy);


  }
  useEffect(() => {
    if ((hover.r === cord.r && hover.c === cord.c) && isMouseDown && ableToChange.current)
    {
      if (move === 0)
      {
        if (gridArray[cord.r][cord.c] === 0)
        {
          const cpy = gridArray.slice();
          cpy[cord.r][cord.c] = 3;
          setArray(cpy);
          ableToChange.current = false;
          setTimeout(() => {ableToChange.current = true},250);
        }
        else if (gridArray[cord.r][cord.c] === 3)
        {
          const cpy = gridArray.slice();
          cpy[cord.r][cord.c] = 0;
          setArray(cpy);
          ableToChange.current = false;
          setTimeout(() => {ableToChange.current = true},250);
        }
      }
    }
    // eslint-disable-next-line
  },[hover,isMouseDown]);
  return (
    <div className = 'w-8 h-8 border relative flex items-center justify-center' onMouseEnter={() => setHover({...cord})} onTouchStart={handleTouch}
      onClick = {() => {if (!playing) {handleClick(cord,gridArray,setArray,move,setMove);}}}>
      {(hover.r === cord.r && hover.c === cord.c) && move !== 0 ? 
        <FillCell2 move = {move}/> :
        <FillCell move = {move} cord = {cord} gridArray = {gridArray}/>}
    </div>
  );  
}


// function resetBoard(setArray)
// {
//   let arr = [];
//   for (let r=0 ; gridSize.r>r ; r++)
//   {
//     let row = [];
//     for (let c=0 ; gridSize.c>c ; c++)
//     {
//       row = [...row,0];
//     }
//     arr = [...arr,row];
//   }
//   arr[5][10] = 1; // src
//   arr[5][20] = 2; // dst
//   start = {r:5,c:10};
//   end = {r:5,c:20};
//   setArray(arr);
// }

export function clearArray(gridArray,setArray,clearObstacles,canvasRef)
{

  const cntx = canvasRef.current.getContext('2d');
  cntx.clearRect(0,0,gridSize.c*32,gridSize.r*32);

  const cpy = gridArray.slice();
  for (let r=0 ; gridArray.length>r ; r++)
  {
    for (let c=0 ; gridArray[0].length>c ; c++)
    {
      if (!(gridArray[r][c] === 1 || gridArray[r][c] === 2 || (!clearObstacles && gridArray[r][c] === 3)))
      {
        cpy[r][c] = 0;
      }
    }
  }
  setArray(cpy);
}

function DrawGrid({gridArray,setArray,gridRef,playing,canvasRef})
{
  const [hover,setHover] = useState(false);
  const [move,setMove] = useState(0);
  const [JSXgrid,setGrid] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => {
      if (!playing)
      {
        clearArray(gridArray,setArray,false,canvasRef);
        setIsMouseDown(true); // Set the state to true
      }
    };
    const handleMouseUp = () => {
      setIsMouseDown(false); // Set the state to false
    };

    const element = gridRef.current;

    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line
  }, [playing,gridArray]); // !!

  useEffect(() => {
    const size_r = gridArray.length;
    const size_c = gridArray[0].length;
    let newGrid = [];
    for (let r=0 ; size_r>r ; r++)
    {
      let row = [];
      for (let c=0 ; size_c>c ; c++)
      {
        const gridCell = <GridCell key = {gridSize.c*r+c} cord = {{r:r,c:c}} move = {move} setMove = {setMove} gridArray = {gridArray} setArray={setArray} hover = {hover} setHover = {setHover} isMouseDown = {isMouseDown} playing = {playing}/>;
        row = [...row,gridCell];
      }
      const add = <div key = {'row-'+r} className = 'flex'> {row} </div>;
      newGrid = [...newGrid,add];
    }
    setGrid(newGrid);
    // eslint-disable-next-line
  },[move,hover,gridArray,isMouseDown,playing])

  
  return <>
    {JSXgrid}
  </>;

}

function initArr(setArray)
{
  let arr = [];
  for (let r=0 ; gridSize.r>r ; r++)
  {
    let row = [];
    for (let c=0 ; gridSize.c>c ; c++)
    {
      row = [...row,0];
    }
    arr = [...arr,row];
  }


  start.r = Math.floor(Math.random()*gridSize.r);
  start.c = Math.floor(Math.random()*gridSize.c);
  end.r = Math.floor(Math.random()*gridSize.r);
  end.c = Math.floor(Math.random()*gridSize.c);
  while (end.r === start.r && end.c === start.c)
  {
    end = {r:Math.floor(Math.random()*gridSize.r) , c: Math.floor(Math.random()*gridSize.c)};
  }

  arr[start.r][start.c] = 1; // src
  arr[end.r][end.c] = 2; // dst
  setArray(arr);
}

export default function Grid({gridArray,canvasRef,setArray,playing})
{
  const gridRef = useRef(null);
  


  const handleResize = () => {
    gridSize = (window.innerWidth > 590) ? {r:Math.floor((window.innerHeight-64)/32) ,c:Math.floor(window.innerWidth/32)} : {r:Math.floor((window.innerHeight-128)/32) ,c:Math.floor(window.innerWidth/32)};


    start = {r:Math.floor(Math.random()*gridSize.r) , c: Math.floor(Math.random()*gridSize.c)};
    end = {r:Math.floor(Math.random()*gridSize.r) , c: Math.floor(Math.random()*gridSize.c)};
    while (end.r === start.r && end.c === start.c)
    {
      end = {r:Math.floor(Math.random()*gridSize.r) , c: Math.floor(Math.random()*gridSize.c)};
    }


    let arr = [];
    for (let r=0 ; gridSize.r>r ; r++)
    {
      let row = [];
      for (let c=0 ; gridSize.c>c ; c++)
      {
        row = [...row,0];
      }
      arr = [...arr,row];
    }
    arr[start.r][start.c] = 1; // src
    arr[end.r][end.c] = 2; // dst
    setArray(arr);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gridArray]); 

  


  // 0-> null , 1 ->src , 2-> dst, 3-> obstacles, on grid array.
  useEffect(() => {
    initArr(setArray);

    // const canvas = canvasRef.current;
    // const container = gridRef.current;
    
    // if (canvas && container) {
    //   canvas.width = container.offsetWidth;
    //   canvas.height = container.offsetHeight;
    // }
    // eslint-disable-next-line
  },[]);


  return <><div ref = {gridRef} className = 'hover:cursor-pointer relative z-20'>
      <canvas ref={canvasRef} width={gridSize.c*32} height= {gridSize.r*32} className = "absolute z-10 pointer-events-none"/>
      {gridArray && <DrawGrid  gridArray = {gridArray} setArray = {setArray} gridRef = {gridRef} canvasRef = {canvasRef} playing = {playing}/>}
    
    </div></>;
}