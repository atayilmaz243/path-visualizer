import { finalAnimation } from "./bfs";
import { find,check,getKey,createKey } from "./common";
import { notFoundAnimation } from "./dfs";



class PriorityQueue {
  constructor() {
      this.elements = [];
  }

  enqueue(item, priority) {
      // Find the right spot to insert the new item
      const node = { item, priority };
      let added = false;
      for (let i = 0; i < this.elements.length; i++) {
          if (this.elements[i].priority < priority) {
              this.elements.splice(i, 0, node);
              added = true;
              break;
          }
      }

      // If the item is not added yet, push it to the end of the array
      if (!added) {
          this.elements.push(node);
      }
  }

  dequeue() {
      // Retrieve and remove the last element (LCFS for equal priorities)
      return this.elements.pop().item;
  }

  isEmpty() {
      return this.elements.length === 0;
  }
}



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
export default function A_search(gridArray,setArray,setPlay,speedArg,canvasRef)
{
  let speed = null;
  if (speedArg === 'Fast')
  {
    speed = 30;
  }
  else if(speedArg === 'Slow')
  {
    speed = 100;
  }
  else if(speedArg === 'Default')
  {
    speed = 60;
  }
  else
  {
    speed = 300;
  }

  setPlay(true);
  const start = find(gridArray,1);
  const end = find(gridArray,2);
  const path = [];
  const from = new Map();
  let visited = new Set();
  const sdist = new Map(); // distance to start point
  let pq = new PriorityQueue();
  pq.enqueue({r:start.r, c:start.c, dts:0},Math.abs(end.r-(start.r))+Math.abs(end.c-(start.c)));
  let found = 0;

  while (!pq.isEmpty())
  {
    const top = pq.dequeue();

    const r = top.r;
    const c = top.c;
    const distToStart = top.dts;

    if (r === end.r && c === end.c)
    {
        found = 1;
        break;
    }

    if (visited.has(`${r}-${c}`))
    {
      // console.log({r:r,c:c});
      continue;
    }
    visited.add(`${r}-${c}`);

    if (!(r === start.r && c === start.c)) 
        path.push({r:r,c:c});

    
    if (check({r:r+1,c:c},gridArray,visited,0) && (!sdist.has(`${r+1}-${c}`) || sdist.get(`${r+1}-${c}`) > distToStart+1))
    {
        sdist.set(`${r+1}-${c}`,distToStart+1);
        let distToEnd = Math.abs(end.r-(r+1))+Math.abs(end.c-(c));
        pq.enqueue({r:r+1,c:c,dts:distToStart+1},distToStart+1+distToEnd);

        from.set(`${r+1}-${c}`,`${r}-${c}`);

    }

    if (check({r:r-1,c:c},gridArray,visited,0) && (!sdist.has(`${r-1}-${c}`) || sdist.get(`${r-1}-${c}`) > distToStart+1))
    {
        sdist.set(`${r-1}-${c}`,distToStart+1);
        let distToEnd = Math.abs(end.r-(r-1))+Math.abs(end.c-(c));
        pq.enqueue({r:r-1,c:c,dts:distToStart+1},distToStart+1+distToEnd);

        from.set(`${r-1}-${c}`,`${r}-${c}`);
    }

    if (check({r:r,c:c+1},gridArray,visited,0) && (!sdist.has(`${r}-${c+1}`) || sdist.get(`${r}-${c+1}`) > distToStart+1))
    {
        sdist.set(`${r}-${c+1}`,distToStart+1);
        let distToEnd = Math.abs(end.r-(r))+Math.abs(end.c-(c+1));
        pq.enqueue({r:r,c:c+1,dts:distToStart+1},distToStart+1+distToEnd);

        from.set(`${r}-${c+1}`,`${r}-${c}`);

    }

    if (check({r:r,c:c-1},gridArray,visited,0) && (!sdist.has(`${r}-${c-1}`) || sdist.get(`${r}-${c-1}`) > distToStart+1))
    {
        sdist.set(`${r}-${c-1}`,distToStart+1);
        let distToEnd = Math.abs(end.r-(r))+Math.abs(end.c-(c-1));
        pq.enqueue({r:r,c:c-1,dts:distToStart+1},distToStart+1+distToEnd);

        from.set(`${r}-${c-1}`,`${r}-${c}`);
    }
  }
  // console.log(path);
//   console.log(from);
  // console.log(path);

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
