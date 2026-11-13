import React from 'react'
import ProfileIcon from '../admin/profileIcon'
import ProfileLink from './ProfileLink'

const ProfilePage = () => {
  return (
    <div className='max-w-4xl p-5'>
      <h2 className='text-4xl font-brand text-brand'> Hello, <i>Ravi</i></h2>
      <div className="flex ">
        <div className="w-1/5 flex flex-col ">
            <div className="bg-brand gap-2 p-4 mt-4 pr-5 flex flex-col  text-white">
                <ProfileIcon></ProfileIcon>
                <p>Ravi Nanayakkara</p>
                <small>ravi@gmail.com</small>
                <p className='font-brand text-sm'>MEMBER SINCE 2025</p>
            </div>
            <div className="flex py-4  w-3xl flex-col">
                <ProfileLink/>
                <ProfileLink/>
                <ProfileLink/>
                <ProfileLink/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
