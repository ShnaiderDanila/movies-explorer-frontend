import { useState, useEffect } from "react";

// Кастомный хук для отслеживания размера окна
function useWindowResize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined, height: undefined
  })

  useEffect(() => {
    function handleResize() {
      setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }, 200);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize)

  }, [])

  return windowSize;
}

export default useWindowResize;