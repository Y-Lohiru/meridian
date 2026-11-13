import React from 'react'
import Button from '../checkout/Button'

const Order = () => {
  return (
    <div className='flex  w-full border-1  border-brand/15 p-4 my-2 justify-between'>
<div className="flex gap-4 w-2/3">
          <div className="img">
        <img src='/pantry.jpg' alt='Pantry' className='max-w-36'></img>
      </div>
      <div className="flex flex-col px-4">
        <p>#M-103383 <span className='rounded-md bg-brand/20 px-2 py-1 text-black/60 text-xs'>Delivered</span></p>
        <p>Table table chair</p>
        <p>Placed: Oct 18 $448</p>
      </div>
</div>
<div className="flex flex-col justify-center">
  <Button ><a href='#' className=''>View Details</a></Button>
</div>
    </div>
  )
}

export default Order
