import React from 'react'
import Image from 'next/image'
function NavBar() {
  return (
    <nav className=' flex justify-between items-center h-16 w-full px-20 py-2 bg-black'>
        <div className="logo text-xl text-white font-extrabold text-center h-fit"><span className=' text-green-400'>&lt;</span>Pass<span className=' text-green-400'>OP/&gt;</span></div>
        <div className='text-white font-bold text-center h-fit flex justify-center items-center rounded-full pl-0.5 pr-2 gap-2 bg-green-600 border border-white hover:scale-110 hover:border-2 hover:cursor-pointer transition-transform'> <Image src="/github.svg" width={25} height={25}></Image>GitHub</div>
    </nav>
  )
}

export default NavBar
