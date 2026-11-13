'use client';
import React, { useEffect } from 'react'
import ProfileIcon from '../admin/profileIcon'
import ProfileLink from './ProfileLink'
import RecentOrder from '../admin/recentOrder'
import checkUser from '@/app/utils/auth';
import { createClient } from '@/app/utils/supabase/client';
import { redirect } from 'next/navigation';
import Order from './Order';

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

  interface Order {
    orderId :string;
    productId:string;
    productName:string;
    quantity:number;
    price:number;
    status:string;
    createdAt:string;
  }

  interface Orders {
    order: Order;
  }
const ProfilePage = () => {
      const [user, setUser] = React.useState<Profile | null>(null);
      const [profilechanged, setProfileChanged] = React.useState(false);
      const [Orders, SetOrders] = React.useState<Orders[]>([]);
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

  
const fetchProducts =   async ({id}:{id:string}) =>{
    const supabase = createClient();
    const {data, error}  = await supabase.from('orders').select('order_id, order_product(product_id), order_product(product(productName, image_url)) user_id').eq('user_id', id);
    if (error) {
        console.error('Error fetching products:', error);
    }
    if (data) {
        SetOrders(data as unknown as Orders[]);
        console.log('Products fetched successfully:', data);
    }

}



  return (
    <div className='p-5 bg-brand/5 min-h-screen'>
      <p className='font-brand p-2'>Home / <b>My Account</b></p>
      <h2 className='text-4xl font-brand text-brand'> Hello, <i>{user?.fname}</i></h2>
      <div className="flex ">
        <div className="w-1/5 flex flex-col  ">
            <div className="bg-brand gap-2 p-4 mt-4 pr-5 flex flex-col  text-white">
                <ProfileIcon></ProfileIcon>
                <p>{user?.fname} {user?.lname}</p>
                <small>{user?.email}</small>
                <p className='font-brand text-sm'>MEMBER SINCE 2025</p>
            </div>
            <div className="flex py-4  w-full flex-col">
                <ProfileLink active={false} url="/profile" text="Profile"/>
                <ProfileLink active={true} url="/orders" text="My Orders"/>
                <ProfileLink active={false} url="/addresses" text="Saved Addresses"/>
                <ProfileLink active={false} url="/settings" text="Password & Preferences"/>
                <ProfileLink active={false} url="/logout" text="Logout"/>
            </div>
        </div>
        <div className="p-8 w-4/5 flex flex-col">
          <h2 className='text-2xl font-brand text-brand mb-4'>My details</h2>
          <hr/>
          <br/>
         <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col">
                <label className='font-brand text-brand text-sm'>FIRST NAME</label>
                <p>{user?.fname}</p>
            </div>
            <div className="flex flex-col">
                <label className='font-brand text-brand'>LAST NAME</label>
                <p>{user?.lname}</p>
            </div>
            <div className="flex flex-col">
                <label className='font-brand text-brand'>EMAIL</label>
                  <p> {user?.email}
                </p>
         </div>
              <div className="flex flex-col">
                <label className='font-brand text-brand'>CONTACT NO</label>
                  <p> {user?.contactno}
                </p>
         </div>
        </div>
        <div className="flex flex-col mt-4">
          <h2 className='text-2xl font-brand text-brand italic'>Recent Orders</h2>
       <Order></Order>
       <Order></Order>
          
          </div>

          <div className="flex flex-col mt-4">
          <h2 className='text-2xl font-brand text-brand italic'>Saved Addresses</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className='font-brand text-brand text-sm'>ADDRESS 1</label>
                <p>{user?.address}</p>
              </div>
              <div className="flex flex-col">
                <label className='font-brand text-brand text-sm'>ADDRESS 2</label>
                <p>456 Oak Avenue, City, State, ZIP</p>
              </div>
              <div className="flex flex-col">
                <label className='font-brand text-brand text-sm'>ADDRESS 3</label>
                <p>789 Pine Road, City, State, ZIP</p>
              </div>
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <h2 className='text-2xl font-brand text-brand italic'>Password & Preferences</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className='font-brand text-brand text-sm'>CHANGE PASSWORD</label>
                  <p>********</p>
                  

                  </div>
                <div className="flex flex-col">
                  <label className='font-brand text-brand text-sm'>PREFERENCES</label>
                  <p>Manage your preferences</p>
                </div>
              </div>
            <a href='#' className='font-brand underline'>Delete my account</a>
            </div>
                  </div>
        
      </div>
    </div>
  )
}

export default ProfilePage
