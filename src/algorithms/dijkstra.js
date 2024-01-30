import { finalAnimation } from "./bfs";
import { find,check,getKey,createKey } from "./common";
import { notFoundAnimation } from "./dfs";


function animate(path,gridArray,setArray,speed)
{

  for (let i=0 ; path.length>i ; i++)
  {
    setTimeout(() => {
        const cpyArray = gridArray.slice();
        cpyArray[path[i].r][path[i].c] = 11;
        setArray(cpyArray);
      },i*speed);
  }
}
// {r:cord.r,c:cord.c}

function goToStart(cord,finalPath,path,start)
{
    // console.log(createKey(cord));
  const nextCord = getKey(path.get(createKey(cord)));
  // console.log(nextCord);
  if (nextCord.r === start.r && nextCord.c === start.c)
  {
    finalPath.push(cord);
    return;
  }
  goToStart(nextCord,finalPath,path,start);
  finalPath.push(cord);

}
export default function dijkstra(gridArray,setArray,setPlay,speedArg,canvasRef)
{
  let speed = null;
  if (speedArg === 'Fast')
  {
    speed = 8;
  }
  else if(speedArg === 'Slow')
  {
    speed = 35;
  }
  else if (speedArg === 'Default')
  {
    speed = 15;
  }
  else
  {
    speed = 120;
  }

  setPlay(true);
  const start = find(gridArray,1);
  const end = find(gridArray,2);
  const path = [];
  const from = new Map();
  const sdist = new Map(); // shortest distance
  let visited = new Set();

  sdist.set(`${start.r}-${start.c}`,0);
  let pq = [{r:start.r,c:start.c}]; // min priority queue for dijkstra algorithm
  let size = 1;

  let found = 0;

  while (size>0)
  {
    const top = pq[size-1];
    pq.pop();

    const r = top.r;
    const c = top.c;
    const cdist = sdist.get(`${r}-${c}`);
    size--;
    if (r === end.r && c === end.c)
    {
        found = 1;
        break;
    }
    else if(visited.has(`${r}-${c}`))
    {
      continue;
    }

    visited.add(`${r}-${c}`);
    if (!(r === start.r && c === start.c)) 
        path.push({r:r,c:c});

    if (check({r:r+1,c:c},gridArray,visited,0) && (!sdist.has(`${r+1}-${c}`) || sdist.get(`${r+1}-${c}`) > cdist+1))
    {
        sdist.set(`${r+1}-${c}`,cdist+1);
        from.set(`${r+1}-${c}`,`${r}-${c}`);
        pq.push({r:r+1,c:c});
        size++;

    }

    if (check({r:r-1,c:c},gridArray,visited,0) && (!sdist.has(`${r-1}-${c}`) || sdist.get(`${r-1}-${c}`) > cdist+1))
    {
        sdist.set(`${r-1}-${c}`,cdist+1);
        from.set(`${r-1}-${c}`,`${r}-${c}`);
        pq.push({r:r-1,c:c});
        size++;
    }

    if (check({r:r,c:c+1},gridArray,visited,0) && (!sdist.has(`${r}-${c+1}`) || sdist.get(`${r}-${c+1}`) > cdist+1))
    {
        sdist.set(`${r}-${c+1}`,cdist+1);
        from.set(`${r}-${c+1}`,`${r}-${c}`);
        pq.push({r:r,c:c+1});
        size++;

    }

    if (check({r:r,c:c-1},gridArray,visited,0) && (!sdist.has(`${r}-${c-1}`) || sdist.get(`${r}-${c-1}`) > cdist+1))
    {
        sdist.set(`${r}-${c-1}`,cdist+1);
        from.set(`${r}-${c-1}`,`${r}-${c}`);
        pq.push({r:r,c:c-1});
        size++;
    }

    pq.sort((a,b) => sdist.get(`${b.r}-${b.c}`)-sdist.get(`${a.r}-${a.c}`));
    // console.log(pq);
  }
//   console.log(from);


  // console.log(path);
  // console.log(end);
  if (found === 0) // implement it later.
  {

    notFoundAnimation(path,gridArray,setArray,setPlay);

    return;
  }

  animate(path,gridArray,setArray,speed);

  const finalPath = [];
  goToStart(end,finalPath,from,start);
  finalPath.unshift(start);
  // console.log(finalPath);

  const timedelay = (path.length-1)*speed+1000;
  finalAnimation(finalPath,gridArray,setArray,setPlay,canvasRef,timedelay,60);


}
