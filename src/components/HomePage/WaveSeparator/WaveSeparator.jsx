import React from 'react'
import './WaveSeparator.css'

const WaveSeparator = () => {
  return (
    <div className='wave-separator-container'>
      <svg
        className="wave-separator"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1439 129"
        preserveAspectRatio="none"
      >
        <path
          fill="#383934"
          fillOpacity="1"
          d="M0,32L120,48C240,64,480,96,720,112C960,128,1200,128,1320,128L1440,128L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
        />
      </svg>
    </div>
  )
}

export default WaveSeparator
