export function find(gridArray,val)
{
  for (let r=0 ; gridArray.length>r ;r++)
  {
    for (let c=0 ; gridArray[0].length>c ; c++)
    {
      if (gridArray[r][c] === val)
      {
        return {r:r,c:c};
      }
    }
  }
  return null;
}

export function check(cord,gridArray,visited,flag = 1)
{
  const size_r = gridArray.length;
  const size_c = gridArray[0].length;
  const key = `${cord.r}-${cord.c}`;
  if (cord.r < 0 || cord.r >= size_r || cord.c < 0 || cord.c >= size_c || visited.has(key) || gridArray[cord.r][cord.c] === 3)
  {
    return false;
  }
  if (flag)
    visited.add(key);
  return true;
}

export function createKey(cord)
{
  return `${cord.r}-${cord.c}`;
}

export function getKey(str)
{
  // console.log(str);
  let i=0;
  let r = '';
  let c = '';
  while (str[i] !== '-')
  {
    r += str[i];
    i++;
  }
  i++;
  while (i < str.length)
  {
    c += str[i];
    i++;
  }
  return {r:parseInt(r,10),c:parseInt(c,10)};
}