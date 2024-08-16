import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [targetTime, setTargetTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    // Set the target time by adding 2 minutes to the current time
    
    const targetString = sessionStorage.getItem('targetTime')
    const target = new Date(targetString)
    
    setTargetTime(target);

    // Update the time every second
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const timeDiff = target - now;

      if (timeDiff <= 0) {
        clearInterval(interval);
        setTimeRemaining('00:00');
      } else {
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeRemaining(
          `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        );
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
      <span>{timeRemaining}</span>
  );
};

export default CountdownTimer;
