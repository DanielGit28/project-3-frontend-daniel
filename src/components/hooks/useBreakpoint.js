import { useState, useEffect } from "react";


//HOW TO USE IT: 
//const [breakPoint] = useBreakpoints();
const useBreakpoint = () => {
  const [data, setData] = useState([]);
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  //Resize event to get the width and height of the window
  window.onresize = function () {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }
  const [myWidth, myHeight] = windowSize;

  useEffect(() => {
    setData([myWidth, myHeight]);

  }, [myWidth, myHeight]);
  return [data];
};

export default useBreakpoint;