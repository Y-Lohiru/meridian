import TrackOrderPage from '@/components/order tracking/orderTracking'
import { Suspense } from 'react'

const page = () => {
  return (
    <div>
      {/* TrackOrderPage reads the order id from the URL (useParams), so it must be inside Suspense */}
      <Suspense fallback={<p className="py-32 text-center text-sm text-ink-subtle">Loading order...</p>}>
        <TrackOrderPage/>
      </Suspense>
    </div>
  )
}

export default page
