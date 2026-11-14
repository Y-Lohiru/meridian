'use client';
import React, { useEffect } from 'react'
import {createClient} from '@/app/utils/supabase/client'
import { redirect } from 'next/dist/client/components/navigation'
import fetchUser from '@/app/utils/auth'
import checkUser from '@/app/utils/auth';
import ProfilePage from '@/components/profile/profilePage';

interface Profile {
    id:string;
    user_id: string;
    fname: string;
    lname: string;
    email: string;
    address: string;
    contactno  : string;
    role: string;
    }

const page = () => {
    const [user, setUser] = React.useState<Profile | null>(null);
    const [profilechanged, setProfileChanged] = React.useState(false);
    const fetchUser = async () => {
        checkUser().then((user) => {
            if (user.data.user) {
                console.log(user.data.user)
                fetchUserProfile({id: user.data.user.id})
            } else {
                console.log("User is not logged in")
                return redirect('/login')
            }
        })
    }
        
    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUserProfile = async ({id}: {id: string}) => {
        const supabase = createClient();
        const { data, error } = await supabase.from('users').select('*').eq('user_id', id).single();
        if (error) {
            console.error('Error fetching user profile:', error);
        } else {
            setUser(data);
            console.log('User profile data:', data);
        }
    };
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

const changeProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    if (user) {
        const {  error } = await supabase.from('users').update({
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            address: user.address,
            contactno: user.contactno
        }).eq('user_id', user.user_id);
        if (error) {
            console.error('Error updating user profile:', error);
        } else {
            console.log('User profile updated successfully');
        }
    }
};

  return (

    <div>   
        <ProfilePage/>
        <button onClick={signout}>signout</button>

        {/* <h1>Profile Page</h1>
        <a href="/track/sjdhjkh">Edit Profile</a>
        
        {user ? (
        <form onSubmit={changeProfile}>
                <div>First Name: <input value={user.fname  || ''} onChange={(e) => setUser({...user, fname: e.target.value})} /></div>
                <div>Last Name:<input value={user.lname  || ''} onChange={(e) => setUser({...user, lname: e.target.value})} /></div>
                <div>Email: <input value={user.email  || ''} onChange={(e) => setUser({...user, email: e.target.value})} /></div>
                <div>Address: <input value={user.address || ''} onChange={(e) => setUser({...user, address: e.target.value})} /></div>
                <div>Contact Number: <input value={user.contactno || ''} onChange={(e) => setUser({...user, contactno: e.target.value})} /></div>
            
            <div className="flex">
                <button type="submit" className='disabled:opacity-30 bg-blue-500 text-white py-2 px-4 rounded'>Save Changes</button>
            </div>
            </form>
        ) : (
            <p>Loading...</p>
        )} */}
    </div>
  )
}

export default page
