import React from 'react'
import logo from '../assets/img/logo-univ.png'
import { HashLoader } from 'react-spinners'
const Loading = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='w-60 h-60 flex items-center justify-center'>
                {/* <HashLoader color='#c3231c' size={100} className='self-center' /> */}
                <div className="loader tracking-[0.15em] font-extrabold">TOGETHER<span className='block tracking-[0.45em]'>MOVING</span> <span className='tracking-[0.25em]'>FORWARD</span></div>
            </div>
        </div>
    )
}

export default Loading
