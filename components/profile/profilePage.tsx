'use client';
import React, { useEffect } from 'react'
import ProfileIcon from '../admin/profileIcon'
import ProfileLink from './ProfileLink'
import RecentOrder from '../admin/recentOrder'
import checkUser from '@/app/utils/auth';
import { createClient } from '@/app/utils/supabase/client';
import { redirect } from 'next/navigation';
import Order from './Order';
import Button from '../checkout/Button';

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


const ProfilePage = () => {
      const [user, setUser] = React.useState<Profile | null>(null);
      const [profilechanged, setProfileChanged] = React.useState(false);
      const [Orders, SetOrders] = React.useState<string[]>([]);
      const [newPassword, setNewPassword] = React.useState('');
      const [editing,setEditing] = React.useState(false);
      const fetchUser = async () => {
          checkUser().then((user) => {
              if (user.data.user) {
                  console.log(user.data.user)
                  fetchUserProfile({id: user.data.user.id})
                  fetchProducts({id: user.data.user.id});
              } else {
                  console.log("User is not logged in")
                  return redirect('/login')
              }

          })

      }
          
      useEffect(() => {
          fetchUser()
      }, [])
  

      const changePassword = async () => {
        const supabase = createClient();
        if (user) {
            const {  error } = await supabase.auth.updateUser({
                password: newPassword
            });
            if (error) {
                console.error('Error updating user password:', error);
            }
        }
      }
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
  const changeProfile = async () => {
      const supabase = createClient();
      if (user) {
          const {  error } = await supabase.from('users').update({
              fname: user.fname,
              lname: user.lname,
              address: user.address,
              contactno: user.contactno
          }).eq('user_id', user.user_id);
          if (error) {
              console.error('Error updating user profile:', error);
          } else {
              console.log('User profile updated successfully');
              setEditing(false);
          }
      }
  };

  
const fetchProducts =   async ({id}:{id:string}) =>{
    const supabase = createClient();
    const {data:orderdata, error}  = await supabase.from('orders').select('order_id,  user_id, status, total, created_at').eq('user_id', id).limit(5).order('created_at', { ascending: false });
    if (error) {
        console.error('Error fetching Orders:', error);
    }
    else {
        const orderIds = orderdata.map(order => order.order_id);
        SetOrders(orderIds);
    }
    
  }

const deleteAccount = async () => {
  const confirmation = prompt("Are you sure you want to delete your account? This action cannot be undone. Type 'DELETE' to confirm.");
  if (confirmation === 'DELETE') {
    const supabase = createClient();
    if (user) {
        const { error } = await supabase.from('users').update({ email: null }).eq('user_id', user.user_id);
        if (error) {
            console.error('Error deleting user account:', error);
        } else {
            console.log('User account deleted successfully');
            signout();
        }
    }
  }
};



  return (
    <div className='mx-auto min-h-screen  bg-brand/5 p-4 sm:p-6 lg:p-8'>
      <p className='font-brand p-2 text-sm text-black/60'>Home / <b className='text-brand'>My Account</b></p>
      <h2 className='px-2 text-3xl font-brand text-brand sm:text-4xl'> Hello, <i>{user?.fname}</i></h2>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex w-full flex-col md:w-1/4 lg:w-1/5">
            <div className="mt-4 flex flex-col gap-2 rounded-sm bg-brand p-5 text-white shadow-md">
                <ProfileIcon></ProfileIcon>
                <p>{user?.fname} {user?.lname}</p>
                <small>{user?.email}</small>
                <p className='mt-2 border-t border-white/20 pt-2 font-brand text-xs tracking-widest text-white/80'>MEMBER SINCE 2025</p>
            </div>
            <div className="flex w-full flex-col gap-1 py-4">
                <ProfileLink active={false} url="/profile" text="Profile"/>
                <ProfileLink active={true} url="/orders" text="My Orders"/>
                <ProfileLink active={false} url="/addresses" text="Saved Addresses"/>
                <ProfileLink active={false} url="/settings" text="Password & Preferences"/>
                <ProfileLink active={false} url="/logout" text="Logout"/>
            </div>
        </div>
        <div className="mt-4 flex w-full flex-col rounded-sm bg-white p-5 shadow-sm sm:p-8 md:w-3/4 lg:w-4/5">
        <div className="flex w-full justify-between items-center">
          <h2 className='mb-4 text-2xl font-brand text-brand'>My details</h2>
          <Button className="bg-transparent border-brand py-2  hover:bg-brand/80 underline" variant={!editing ? 'outline' : 'secondary'} onClick={()=>[!editing ? setEditing((prev)=>!prev) : changeProfile()]}>{!editing?'Edit' : 'Save'}</Button>
        </div>
          <hr className='border-brand/15'/>
          <br/>
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex flex-col gap-1">
                <label className='font-brand text-brand text-xs tracking-widest'>FIRST NAME</label>
                <input value={user?.fname} readOnly={!editing} className='rounded-sm border border-transparent bg-brand/5 p-2 outline-none transition read-only:cursor-default focus:border-brand focus:ring-2 focus:ring-brand/20' onChange={(e) => setUser({...user, fname: e.target.value} as any)}></input>
            </div>
            <div className="flex flex-col gap-1">
                <label className='font-brand text-brand text-xs tracking-widest'>LAST NAME</label>
                <input value={user?.lname} readOnly={!editing} className='rounded-sm border border-transparent bg-brand/5 p-2 outline-none transition read-only:cursor-default focus:border-brand focus:ring-2 focus:ring-brand/20' onChange={(e) => setUser({...user, lname: e.target.value} as any)}></input>
            </div>
            <div className="flex flex-col gap-1">
                <label className='font-brand text-brand text-xs tracking-widest'>EMAIL</label>
                <p  className='break-all py-2 rounded-sm' >{user?.email}</p>
         </div>
              <div className="flex flex-col gap-1">
                <label className='font-brand text-brand text-xs tracking-widest'>CONTACT NO</label>
                  <input value={user?.contactno} readOnly={!editing} className='rounded-sm border border-transparent bg-brand/5 p-2 outline-none transition read-only:cursor-default focus:border-brand focus:ring-2 focus:ring-brand/20' onChange={(e) => setUser({...user, contactno: e.target.value} as any)}></input>
         </div>
        </div>
        <div className="mt-8 flex flex-col">
          <h2 className='mb-2 text-2xl font-brand text-brand italic'>Recent Orders</h2>
       {     Orders.length > 0? (
<>
       {Orders.map((id, index) => (

        <Order key={index} orderid={id} />
       )
)}
       </>):<p className='rounded-sm border border-dashed border-brand/20 p-6 text-center text-black/50'>No orders yet</p>}
</div>



          <div className="mt-8 flex flex-col">
          <h2 className='text-2xl font-brand text-brand italic'>Saved Addresses</h2>
            <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="flex w-full flex-col gap-1 rounded-sm border border-brand/10 bg-brand/10 p-4">
                <label className='font-brand text-brand text-xs tracking-widest text-wrap '>ADDRESS 1</label>
                <p>{user?.address}</p>
              </div>
        
              </div>
            </div>

            <div className="mt-8 flex flex-col">
              <h2 className='mb-2 text-2xl font-brand text-brand italic'>Password & Preferences</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label className='font-brand text-brand text-xs tracking-widest'>CHANGE PASSWORD</label>
                  <input type="password" placeholder='New Password' className='rounded-sm border border-transparent bg-brand/5 p-2 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20' onChange={(e) => setNewPassword(e.target.value)}></input>
                  <Button className="bg-transparent border-brand py-2  hover:bg-brand/80 underline" variant='outline' onClick={changePassword}>Change Password</Button>
                </div>
              </div>
              <hr className='my-6 border-brand/15'/>
            <a href='#' className='w-fit font-brand text-sm text-red-600 underline transition hover:text-red-800' onClick={deleteAccount}>Delete my account</a>
            </div>
                  </div>
        
      </div>
    </div>
  )
}

export default ProfilePage
