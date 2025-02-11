import { useEffect, useState } from 'react';

export const useCountDown = (reset) => {
  const [timer, setTimer] = useState(300);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    setIsTimeUp(false);
    setTimer(300);
  }, [reset]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setIsTimeUp(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return { minutes, seconds, isTimeUp };
};
