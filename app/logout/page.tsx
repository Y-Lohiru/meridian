'use client';

import React from 'react'
import { createClient } from '../utils/supabase/client';
import { redirect } from 'next/navigation';

const page = () => {
      const signout = async () => {
          const supabase = createClient();
          const { error } = await supabase.auth.signOut();
          if (error) {
              console.error('Error signing out:', error);
          } else {
              console.log('User signed out successfully');
              return redirect('/login');
          }
      }
      React.useEffect(() => {
          signout();
      }, [])
  return (
    <div>
      
    </div>
  )
}

export default page
