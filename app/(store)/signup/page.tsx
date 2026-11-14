'use client';
import React, { useEffect } from 'react'
import {createClient} from '@/app/utils/supabase/client'
import { redirect } from 'next/dist/client/components/navigation'
import { useState } from 'react'
import SignupForm from '@/components/auth/signUpForm'

const page =() => {
    const supabase = createClient()
    const fetchUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()

if ( user) {
  console.log("User is  logged in")
  return redirect(`/profile/${user?.id}`)
} else {
  console.log("Logged in user details:", user)
}
    }

useEffect(() => {
    fetchUser()
}, [])

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const supabase = createClient();
      const { error, data } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) {
        console.error('Error logging in:', error);
      } else {
        const {data:usercreationData,error:usercreationError} = await supabase.from('users').insert([{user_id:data.user?.id,email:email,role:'user'}])
        if (usercreationError) {
          console.error('Error creating user:', usercreationError);
        } else {
          console.log('User created successfully:', usercreationData);
        }
        console.log('User logged in successfully');
        return redirect(`/profile/${data.user?.id}`);
      }
    };
  return (
    <div>
      <SignupForm />
    </div>
  )
}

export default page
