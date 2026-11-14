import React from 'react'
import Button from '../checkout/Button'
import { createClient } from '@/app/utils/supabase/client';

  interface Order {
    orders:{
      total: number;
      status: string;
      created_at: string;
    };
    product:{
      productName: string;
      image_url: string;
    }
  
  }

const Order = ({orderid}:{orderid:string}) => {
  const [order, setOrder] = React.useState<Order | null>(null);
  React.useEffect(() => {
    const fetchOrder = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('order_product').select('product_id, product(productName,image_url), orders(total, status, created_at)').eq('order_id', orderid).limit(1);
      if (error) {
        console.error('Error fetching order:', error);
      } else {
        setOrder(data[0] as any);
        console.log('Order data:', data[0]);
      }
    };
fetchOrder();
  },[orderid]);
  return (
    <div className='flex w-full flex-col gap-4 rounded-sm border border-brand/15 bg-white p-4 my-2 sm:flex-row sm:items-center sm:justify-between'>
<div className="flex gap-4 sm:w-2/3">
          <div className="img shrink-0">
        <img src={order?.product?.image_url} alt='Pantry' className='size-20 rounded-sm bg-brand/10 object-cover'></img>
      </div>
      <div className="flex flex-col justify-center gap-1 px-2">
        <p className='font-medium text-brand'>{order?.product?.productName} <span className='ml-2 rounded-full bg-brand/15 px-2.5 py-0.5 align-middle text-xs font-medium capitalize text-brand'>{order?.orders?.status}</span></p>
        <p className='text-lg font-semibold'>$ {order?.orders?.total}</p>
        <p className='text-sm text-black/60'>Placed: {order?.orders?.created_at.slice(0,10)}</p>
      </div>
</div>
<div className="flex flex-col justify-center sm:items-end">
  <Button className="rounded-sm px-5 py-2 text-xs tracking-widest"><a href={`/track/${orderid}`} target="_blank" rel="noopener noreferrer" className=''>View Details</a></Button>
</div>
    </div>)
};


export default Order
