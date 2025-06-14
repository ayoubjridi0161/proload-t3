import React from 'react'
import './loading.css'
const loading = () => {
  return (
    <div className='!h-[calc(100svh-var(--header-height))] grid place-items-center'>
    <div className="loader "></div>
    </div>
  )
}

export default loading