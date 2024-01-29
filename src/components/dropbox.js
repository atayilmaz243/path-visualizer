import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "./svg";



export default function DropBox({data,state,setState,width})
{
  const [popup,setPopup] = useState(null);
  const [open,setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const tmp = data.map((item) => {
      if (state === item)
      {
        return null;
      }
      return <div className = 'hover:bg-slate-100 w-full h-10 pl-4 font-medium flex items-center' onClick = {() => {setState(item)}}>
        {item}
      </div>;
    })
    setPopup(tmp);

  },[state,setState,data]);

  useEffect(() => {
    function handleClickOutside(event) {
        // If the click is outside the dropdown, close it
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {  
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]); // Empty array ensures that effect is only run on mount and unmount


  return (<>
    <div ref = {dropdownRef} style = {{width:width}} className = 'h-10 relative rounded-md bg-slate-100 shadow-md flex items-center font-medium cursor-pointer text-gray-700 text-base' onClick={() => {setOpen(!open);}}>

      <p className = 'line-clamp-1 pl-4'>{state}</p>  
      {open &&
      <div style = {{width:width}} className = 'absolute top-11 left-0 z-10 bg-white rounded-md shadow-lg'>
        {popup}
      </div>}
      
      {!open ? <div className = 'absolute w-3 h-3 right-3'><ArrowUp /></div>: <div className = 'absolute w-3 h-3 right-3'><ArrowDown /></div>}
    </div>
  
  
  </>);

}