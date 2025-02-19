// src/Component/TimeCard.jsx
import React, { useState, useEffect } from 'react';

function TimeCard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeString = time.toLocaleTimeString();
  const day = time.toLocaleDateString('en-US', { weekday: 'short' });
  const date = time.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <h1 className='md:text-xl  text-lg'>{timeString}</h1>
      <h2 className='md:text-xl text-lg '>{day}</h2>
      <h2 className='md:text-xl text-lg'>{date}</h2>
      
    </div>
  );
}

export default TimeCard;
