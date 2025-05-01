import { useState, useEffect } from "react";

function useScreenSize() {
  const getSize = () => ({
    width: window.visualViewport
      ? window.visualViewport.width
      : window.innerWidth,
    height: window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight,
  });

  const [size, setSize] = useState(getSize());

  useEffect(() => {
    const handleResize = () => setSize(getSize());
    window.addEventListener("resize", handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return size;
}

export default useScreenSize;
