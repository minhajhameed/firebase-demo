import React from 'react'
import AddBook from '@/components/AddBook'
import Link from 'next/link'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Link href='/' className="transition duration-150 h-10 items-center justify-center flex w-20 ease-in-out bg-violet-500 my-10 p-1 text-white rounded-lg">Home</Link>
      <AddBook />
    </div>
  )
}

export default page
