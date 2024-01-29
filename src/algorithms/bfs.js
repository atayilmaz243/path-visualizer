import { DrawLine} from "../components/canvas";
import { find,check,getKey,createKey } from "./common";





function addBfs(cord,gridArray,visited,queue,moves,turn,path)
{
  if (check({r:cord.r+1,c:cord.c},gridArray,visited))
  {
    if (gridArray[cord.r+1][cord.c] === 2)
    {
      // console.log(createKey({r:cord.r+1,c:cord.c}));
      path.set(createKey({r:cord.r+1,c:cord.c}),createKey(cord));
      return 1;
    }
    path.set(createKey({r:cord.r+1,c:cord.c}),createKey(cord));
    moves.push({r:cord.r+1,c:cord.c});
    queue.push({r:cord.r+1,c:cord.c});
  }
  if (check({r:cord.r,c:cord.c+1},gridArray,visited))
  {
    if (gridArray[cord.r][cord.c+1] === 2)
    {
      // console.log(createKey({r:cord.r,c:cord.c+1}));
      path.set(createKey({r:cord.r,c:cord.c+1}),createKey(cord));
      return 1;
    }
    path.set(createKey({r:cord.r,c:cord.c+1}),createKey(cord));
    moves.push({r:cord.r,c:cord.c+1});
    queue.push({r:cord.r,c:cord.c+1});
  }
  if (check({r:cord.r-1,c:cord.c},gridArray,visited))
  {
    if (gridArray[cord.r-1][cord.c] === 2)
    {
      // console.log(createKey({r:cord.r-1,c:cord.c}));
      path.set(createKey({r:cord.r-1,c:cord.c}),createKey(cord));
      return 1;
    }
    path.set(createKey({r:cord.r-1,c:cord.c}),createKey(cord));
    moves.push({r:cord.r-1,c:cord.c});
    queue.push({r:cord.r-1,c:cord.c});
  }
  if (check({r:cord.r,c:cord.c-1},gridArray,visited))
  {
    if (gridArray[cord.r][cord.c-1] === 2)
    {
      // console.log(createKey({r:cord.r,c:cord.c-1}));
      path.set(createKey({r:cord.r,c:cord.c-1}),createKey(cord));
      return 1;
    }
    path.set(createKey({r:cord.r,c:cord.c-1}),createKey(cord));
    moves.push({r:cord.r,c:cord.c-1});
    queue.push({r:cord.r,c:cord.c-1});
  }
  return 0;
}

function animate(moves,turn,gridArray,setArray,speed)
{
  const copy = [];
  const cpy_turn = turn;
  const t = (turn-10)*speed;
  for (let i=0 ; moves.length>i ; i++)
  {
    copy.push(moves[i]);
  }
  setTimeout(() => {
    const cpyArray = gridArray.slice();
    for (let i=0 ; copy.length>i ; i++)
    {
      cpyArray[copy[i].r][copy[i].c] = cpy_turn;
    }
    // console.log(turn);
    setArray(cpyArray);
  },t);
}
// {r:cord.r,c:cord.c}

function goToStart(cord,finalPath,path,start)
{
  const nextCord = getKey(path.get(createKey(cord)));
  // console.log(nextCord);
  if (nextCord.r === start.r && nextCord.c === start.c)
  {
    return;
  }
  goToStart(nextCord,finalPath,path,start);
  finalPath.push(nextCord);

}

function notFoundAnimationBFS(arr,gridArray,setArray,setPlay,speed = 8)
{
  for (let i=0; arr.length>i ; i++)
  {
    setTimeout(() => {
      const moves = arr[i].moves;
      for (let i=0; moves.length>i ; i++)
      {
        const cpy = gridArray.slice();
        cpy[moves[i].r][moves[i].c] = -2;
        setArray(cpy);
      }
    },i*speed)
  }
  setTimeout(() => {
    setPlay(false);
  },(arr.length-1)*speed+2000);
}

export function finalAnimation(finalPath,gridArray,setArray,setPlay,canvasRef,timedelay,tb = 60)
{
  const cpyFinalPath = [];
  for (let i = 0; finalPath.length>i ; i++)
  {
    cpyFinalPath.push(finalPath[i]);
  }
  
  setTimeout(() => {
      DrawLine(cpyFinalPath,tb,canvasRef);
  },timedelay+tb*10);

  
  for (let i=1 ; finalPath.length-1>i ; i++)
  {
    const t = (i-1)*tb;
    setTimeout(() => {
      const cpyArray = gridArray.slice();
      gridArray[finalPath[i].r][finalPath[i].c] = -1;
      setArray(cpyArray);
    },t+timedelay);
  }


  setTimeout(() => {
    setPlay(false);
    // adjust setplay time
  },timedelay + (finalPath.length-3)*tb + 1000);


}
export default function bfs(gridArray,setArray,setPlay,speedArg,canvasRef)
{
  let speed = null;
  if (speedArg === 'Fast')
  {
    speed = 40;
  }
  else if(speedArg === 'Slow')
  {
    speed = 300;
  }
  else if(speedArg === 'Default')
  {
    speed = 100;
  }
  else
  {
    speed = 500;
  }

  const start = find(gridArray,1);
  const end = find(gridArray,2);
  const path = new Map();

  let visited = new Set();
  visited.add(`${start.r}-${start.c}`);


  let queue = [start];
  let turn = 10;
  let loop = 1;

  setPlay(true);
  const arr = [];
  while (loop !== 0)
  {
    const len = queue.length;
    const moves = [];
    for (let i=0 ; len>i ; i++)
    {
      // console.log(`${turn-9} : ${queue[i].r} , ${queue[i].c}`);
      const cord = queue[0];
      queue.shift();
      if (addBfs(cord,gridArray,visited,queue,moves,turn,path))
      {
        loop = 0;
        break;
      }

    }

    if (queue.length === 0 && loop === 1)
    {
      notFoundAnimationBFS(arr,gridArray,setArray,setPlay);
      return;
    }
    else if (loop !== 0)
    {
      arr.push({moves,turn});
      turn++;
    }
  }
  // console.log(path);
  // console.log(end);
  for (let i=0 ; arr.length>i ; i++)
  {
    animate(arr[i].moves,arr[i].turn,gridArray,setArray,speed);
  }

  const timedelay = ((turn-1)-10)*speed+1000;
  // console.log(path.get(createKey(end)));
  const finalPath = [];
  goToStart(end,finalPath,path,start);
  // console.log(finalPath);
  finalPath.unshift(start);
  finalPath.push(end);
  finalAnimation(finalPath,gridArray,setArray,setPlay,canvasRef,timedelay,60);


}