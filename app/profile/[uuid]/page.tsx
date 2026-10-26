'use client';
import React, { useEffect } from 'react'
import {createClient} from '../../utils/supabase/client'
import { redirect } from 'next/dist/client/components/navigation'

const page = () => {
    const supabase = createClient()
    const fetchUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()

if ( user) {
  console.log("User is  logged in")
  // return redirect(`/profile/${user?.id}`)
} else {
  console.log("User is not logged in")
    window.location.href = '/login'
}
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUserDetails = async () => {
        const {data,error} = await supabase.from('users').select('*').eq('id', supabase.auth.user()?.id)
        if (error) {
            console.error('Error fetching user details:', error);
        } else {
            console.log('User details:', data);
        }
  return (

    <div>
      
    </div>
  )
}

export default page
