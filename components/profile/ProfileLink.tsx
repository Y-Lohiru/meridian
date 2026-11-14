import React from 'react'

const ProfileLink = ({active,url,text}:{active:boolean,url:string,text:string}) => {
  return (
    <div className='flex flex-col w-full'>
      <hr/>
        <a href={url} className={`px-4 py-2  border-brand font-weight-500 ${active && 'border-l-4 border-l-brand' }`}>{text}</a>
    </div>
  )
}

export default ProfileLink
