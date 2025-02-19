// weather/src/Component/Hero.jsx
import React from 'react'

function Hero({weather,temperature,min_temperature,max_temperature,city}) {
  return (
    <div className='w-[100%] h-[100%] '>
    {
        weather && (
            <div>
                <h1 className='text-3xl font-bold'>{city}</h1>
                
            </div>
        )
    }

    </div>
  )
}

export default Hero