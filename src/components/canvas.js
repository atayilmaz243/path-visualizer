
// cell width and height
const cw = 32;
const ch = 32;
const LineColor = 'rgb(250 204 21)';
function Down(context,r,c,t)
{  
    const left = c*cw;
    const top = r*ch;
    for (let h=top; h < top+ch ; h++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(left+cw/2-2,h,4,1);
            // console.log(t*(h-top)/ch);
        },t*(h-top)/ch);
    }

}

function Up(context,r,c,t)
{  
    const left = c*cw;
    const top = r*ch;
    for (let h=top+ch-1; h >= top ; h--)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(left+cw/2-2,h,4,1);
            // console.log(t*(h-top)/ch);
        },t*(top+ch-1-h)/ch);
    }
}

function Left(context,r,c,t)
{
    const left = c*cw;
    const top = r*ch;
    for (let x=left; left+cw>x ; x++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(x,top+ch/2-2,1,4);
        },t * (left+cw-1-x)/(cw));
    }

}

function Right(context,r,c,t)
{
    const left = c*cw;
    const top = r*ch;
    for (let x=left; left+cw>x ; x++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(x,top+ch/2-2,1,4);
        },t * (x-left)/(cw));
    }

}

function LeftBottom(context,r,c,t)
{
    const left = c*cw;
    const top = r*ch;
    for (let x=left; left+cw/2+1>=x ; x++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(x,top+ch/2-2,1,4);
        },t/2 * (x-left)/(cw/2+2));
    }
    for (let y = top+ch/2+2; y < top+ch ; y++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(left+cw/2-2,y,4,1);
        },t/2 + (t/2 * (y-(top+ch/2+2)))/(ch/2-2));
    }

}
//
function BottomLeft(context,r,c,t)
{
    const left = c*cw;
    const top = r*ch;
    for (let x=left; left+cw/2-3>=x ; x++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(x,top+ch/2-2,1,4);
        },t/2 + (t/2 * (left+cw/2-3-x)/(cw/2-2)));
    }
    for (let y = top+ch/2-2; y < top+ch ; y++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(left+cw/2-2,y,4,1);
        },t/2 * ((top+ch-1-y)/(ch/2+2)));
    }

}
//
function BottomRight(context,r,c,t)
{
    const left = c*cw;
    const top = r*ch;
    for (let x=left+cw/2+2; left+cw>x ; x++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(x,top+ch/2-2,1,4);
        },t/2 + (t/2 * (x-(left+cw/2+2))/(cw/2-2)));
    }
    for (let y = top+ch/2-2; y < top+ch ; y++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(left+cw/2-2,y,4,1);
        },t/2 * ((top+ch-1-y)/(ch/2+2)));
    }

}
//
function RightBottom(context,r,c,t)
{
    const left = c*cw;
    const top = r*ch;
    for (let x=left+cw/2-2; left+cw>x ; x++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(x,top+ch/2-2,1,4);
        },(t/2 * ((left+cw-1-x))/(cw/2+2)));
    }
    for (let y = top+ch/2+2; y < top+ch ; y++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(left+cw/2-2,y,4,1);
        },t/2 + (t/2 * ((y-(top+ch/2+2))/(ch/2))));
    }

}
//
function LeftUp(context,r,c,t)
{
    const left = c*cw;
    const top = r*ch;
    for (let x=left; left+cw/2+1>=x ; x++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(x,top+ch/2-2,1,4);
        },t/2 * (x-left)/(cw/2+2));
    }
    for (let y = top+ch/2-3; y>=top ; y--)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(left+cw/2-2,y,4,1);
        },t/2 + (t/2 * (top+ch/2-3-y))/(ch/2-2));
    }

}

function UpLeft(context,r,c,t)
{
    const left = c*cw;
    const top = r*ch;
    for (let x=left+cw/2-3; left<=x ; x--)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(x,top+ch/2-2,1,4);
        },t/2 + (t/2 * (left+cw/2-3-x)/(cw/2-2)));
    }
    for (let y = top; y<top+ch/2+2 ; y++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(left+cw/2-2,y,4,1);
        },(t/2 * (y-top))/(ch/2+2));
    }

}

export function UpRight(context,r,c,t)
{
    const left = c*cw;
    const top = r*ch;
    for (let x=left+cw/2+2; left+cw>x ; x++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(x,top+ch/2-2,1,4);
        },t/2 + (t/2 * (x-(left+cw/2+2))/(cw/2-2)));
    }
    for (let y = top; y<top+ch/2+2 ; y++)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(left+cw/2-2,y,4,1);
        },(t/2 * (y-top))/(ch/2+2));
    }

}


function RightUp(context,r,c,t)
{
    const left = c*cw;
    const top = r*ch;
    for (let x=left+cw-1; x>=left+cw/2-2 ; x--)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(x,top+ch/2-2,1,4);
        },t/2 * (left+cw-1-x)/(cw/2+2));
    }
    for (let y = top+ch/2-3; y>=top ; y--)
    {
        setTimeout(() => {
            context.fillStyle = LineColor;
            context.fillRect(left+cw/2-2,y,4,1);
        },t/2 + (t/2 * (top+ch/2-3-y))/(ch/2-2));
    }

}


export function DrawLine(path,tbetween,canvasRef)
{
    let t = 0;
    const context = canvasRef.current.getContext('2d');
    for (let i=1 ; path.length-1>i ; i++)
    {
        const pr = path[i-1].r;
        const pc = path[i-1].c;

        const cr = path[i].r;
        const cc = path[i].c;

        const nr = path[i+1].r;
        const nc = path[i+1].c;

        if (pr === nr && nc > pc)
        {
            setTimeout(() => {
                Right(context,cr,cc,tbetween);
            },t);
        }
        else if (pr === nr && nc < pc)
        {
            setTimeout(() => {
                Left(context,cr,cc,tbetween);
            },t);
        }
        else if (nc === pc && nr > pr)
        {
            setTimeout(() => {
                Down(context,cr,cc,tbetween);
            },t);
        }
        else if (nc === pc && nr < pr)
        {
            setTimeout(() => {
                Up(context,cr,cc,tbetween);
            },t);
        }
        else if (nc > pc  && nr < pr && cr === pr && cc-1 === pc)
        {
            setTimeout(() => {
                LeftUp(context,cr,cc,tbetween);
            },t);
        }
        else if (nc > pc  && nr > pr && cr === pr && cc-1 === pc)
        {
            setTimeout(() => {
                LeftBottom(context,cr,cc,tbetween);
            },t);
        }
        else if (nc < pc  && nr > pr && cr-1 === pr && cc === pc)
        {
            setTimeout(() => {
                UpLeft(context,cr,cc,tbetween);
            },t);
        }
        else if (nc > pc  && nr > pr && cr-1 === pr && cc === pc)
        {
            setTimeout(() => {
                UpRight(context,cr,cc,tbetween);
            },t);
        }
        else if (nc < pc  && nr > pr && cr === pr && cc+1 === pc)
        {
            setTimeout(() => {
                RightBottom(context,cr,cc,tbetween);
            },t);
        }
        else if (nc < pc  && nr < pr && cr === pr && cc+1 === pc)
        {
            setTimeout(() => {
                RightUp(context,cr,cc,tbetween);
            },t);
        }
        else if (nc < pc  && nr < pr && cc === pc && cr+1 === pr)
        {
            setTimeout(() => {
                BottomLeft(context,cr,cc,tbetween);
            },t);
        }
        else
        {
            setTimeout(() => {
                BottomRight(context,cr,cc,tbetween);
            },t);
        }
        t += tbetween;
    }
}