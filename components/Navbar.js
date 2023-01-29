import React from 'react';
import Link from 'next/link';
import Image from "next/image"

const Navbar = () => {
  return (
    <div className='h-30 p-4 flex items-center justify-center bg-poke-red shadow-[0_4px_50px_#EF5350]'>
      
      <Link href="/">
        <a>
          <Image src="/logo.png" alt="" height={80} width={160} />
        </a>
      </Link>
      <br />
    </div>
    
  )
}

export default Navbar;