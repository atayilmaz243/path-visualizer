import { find } from "./common";

// flag 1-> vertical 0-> horizontal line

function generate(tl,br,array,path,flag)
{
    if (br.r-tl.r+1 <= 2 && br.c-tl.c+1 <= 2)
    {
        return;
    }


    if (flag)
    {
        const midc = Math.floor((tl.c+br.c)/2);
        if (midc === tl.c || midc === br.c)
        {
            generate(tl,br,array,path,!flag);
            return;
        }

        let flag2 = false;
        let flag3 = false;
        if (array[tl.r-1][midc] !== 3)
        {
            flag2 = true;

        }
        if (array[br.r+1][midc] !== 3)
        {
            flag3 = true;
        }


        const random = (flag2 || flag3) ? -1 : Math.floor(Math.random()*(br.r-tl.r+1))+tl.r;
        for (let r=tl.r ; br.r>=r ; r++)
        {
            if (r === random || (r === tl.r && flag2) || (r === br.r && flag3) || array[r][midc] === 1 || array[r][midc] === 2)
                continue;

            path.push({r:r,c:midc});
            array[r][midc] = 3;
        }

        generate(tl,{r:br.r,c:midc-1},array,path,!flag);
        generate({r:tl.r,c:midc+1},br,array,path,!flag);
    }
    else
    {
        const midr = Math.floor((tl.r+br.r)/2);
        if (midr === tl.r || midr === br.r)
        {
            generate(tl,br,array,path,!flag);
            return;
        }

        let flag2 = false;
        let flag3 = false;

        if (array[midr][tl.c-1] !== 3)
        {
            flag2 = true;

        }
        if (array[midr][br.c+1] !== 3)
        {
            flag3 = true;
        }


        const random = (flag2 || flag3) ? -1 : Math.floor(Math.random()*(br.c-tl.c+1))+tl.c;
        for (let c=tl.c ; br.c>=c ; c++)
        {
            if (c === random || (c === tl.c && flag2) || (c === br.c && flag3) || array[midr][c] === 1 || array[midr][c] === 2)
                continue;

            path.push({r:midr,c:c});
            array[midr][c] = 3;
        }

        generate(tl,{r:midr-1,c:br.c},array,path,!flag);
        generate({r:midr+1,c:tl.c},br,array,path,!flag);
    }
}



export function GenenerateMaze(gridArray,setArray,setPlay)
{
    setPlay(true);
    const r_size = gridArray.length;
    const c_size = gridArray[0].length;

    const start = find(gridArray,1);
    const end = find(gridArray,2);
    // console.log(start);
    // console.log(end);

    const cpyArray = [];
    for (let r=0 ; r_size>r ; r++)
    {
        const tmp = [];
        for (let c=0 ; c_size>c ; c++)
        {
            tmp.push(gridArray[r][c]);

        }
        cpyArray.push(tmp);
    }

    const path = [];
    for (let i=0; c_size>i ; i++)
    {
        if (!(start.r === 0 && start.c === i) && !(end.r === 0 && end.c === i))
        {
            path.push({r:0,c:i});
            cpyArray[0][i] = 3;
        }
        if (!(start.r === r_size-1 && start.c === c_size-1-i) && !(end.r === r_size-1 && end.c === c_size-1-i))
        {
            path.push({r:r_size-1,c:c_size-1-i});
            cpyArray[r_size-1][c_size-1-i] = 3;
        }
    }
    for (let i=1; r_size-1>i ; i++)
    {
        if (!(start.r === i && start.c === 0) && !(end.r === i && end.c === 0))
        {
            path.push({r:i,c:0});
            cpyArray[i][0] = 3;

        }
        if (!(start.r === r_size-1-i && start.c === c_size-1) && !(end.r === r_size-1-i && end.c === c_size-1))
        {
            path.push({r:r_size-1-i,c:c_size-1});
            cpyArray[r_size-1-i][c_size-1] = 3;
        }
    }


    generate({r:1,c:1},{r:r_size-2,c:c_size-2},cpyArray,path,true);
    for (let i=0 ; path.length>i ; i++)
    {
        setTimeout(() => {
            const cpy = gridArray.slice();
            cpy[path[i].r][path[i].c] = 3;
            setArray(cpy);
        },5*i);
    }
    setTimeout(() => {setPlay(false)},(path.length-1)*5);

    // setArray(cpyArray);
}