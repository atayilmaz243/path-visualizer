import { finalAnimation } from "./bfs";
import { find,check,createKey } from "./common";




function animation(moves,speed,gridArray,setArray)
{
  for (let i=1; moves.length>i ; i++)
  {
    setTimeout(() => {const cpy = gridArray.slice();
    cpy[moves[i].r][moves[i].c] = 12;
    setArray(cpy)},speed*(i-1));
  }
}

export function notFoundAnimation(moves,gridArray,setArray,setPlay,speed = 2)
{
  for (let i=0; moves.length>i ; i++)
  {
    setTimeout(() => {const cpy = gridArray.slice();
    cpy[moves[i].r][moves[i].c] = -2;
    setArray(cpy)},speed*(i));
  }

  setTimeout(() => {
    setPlay(false);
  },speed*(moves.length-1)+2000);
}


function DFS(r,c,end,visited,path,moves,gridArray)
{
    if (!check({r:r,c:c},gridArray,visited))
    {
        return false;
    }
    else if (r === end.r && c === end.c)
    {
      return true;
    }

    const key = createKey({r:r,c:c});
    visited.add(key);
    moves.push({r:r,c:c});

    if (DFS(r+1,c,end,visited,path,moves,gridArray))
    {
        path.push({r:r+1,c:c});

        return true;
    }
    else if (DFS(r-1,c,end,visited,path,moves,gridArray))
    {
        path.push({r:r-1,c:c});
        return true;
    }
    else if (DFS(r,c+1,end,visited,path,moves,gridArray))
    {
        path.push({r:r,c:c+1});
        return true;
    }
    else if (DFS(r,c-1,end,visited,path,moves,gridArray))
    {
        path.push({r:r,c:c-1});
        return true;
    }

    return false;
}


export default function VisualizeDFS(gridArray,setArray,setPlay,speedArg,canvasRef)
{
  let speed = null;
  if (speedArg === 'Fast')
  {
    speed = 30;
  }
  else if(speedArg === 'Slow')
  {
    speed = 120;
  }
  else if(speedArg === 'Default')
  {
    speed = 80;
  }
  else
  {
    speed = 200;
  }

  const start = find(gridArray,1);
  const end = find(gridArray,2);
  const path = [];
  const moves = [];
  console.log(end);

  let visited = new Set();
  setPlay(true);
  const findable = DFS(start.r,start.c,end,visited,path,moves,gridArray);

  if (!findable)
  {
    console.log(moves);
    moves.shift();
    console.log(moves);
    notFoundAnimation(moves,gridArray,setArray,setPlay);
    return;
  }


  const timedelay = (moves.length-2)*speed+1000;
  animation(moves,speed,gridArray,setArray);

  path.push(start);
  const reverse = [];
  for (let i=path.length-1; i>=0 ; i--)
  {
    reverse.push(path[i]);
  }
  finalAnimation(reverse,gridArray,setArray,setPlay,canvasRef,timedelay,60);

}