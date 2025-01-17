import React from 'react'
import logo from '../assets/img/logo.png'
import logoUniv from '../assets/img/logo-univ.png'
import { Link } from 'react-router-dom'
import google from '../assets/img/google.png'
import FormLoginAdmin from '../Fragments/FormLoginAdmin'


const AdminLogin = () => {
    return (
        <>
            <nav className='bg-white px-6 lg:px-24 py-3 sticky top-0'>
                <Link to={"/"}>
                    <div className='text-2xl font-extrabold'>Fasilkom.</div>
                </Link>
            </nav>
            <div className='flex justify-center items-center min-h-screen'>
                <div className='w-full max-w-xs sm:max-w-[420px]'>
                    <svg
                        width="70"
                        height="70"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        className="fill-current mx-auto mb-5"
                    >
                        <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                    </svg>
                    <div className='text-3xl font-extrabold mb-2 text-center'>Login To Fasilkom</div>
                    <p className='font-medium text-slate-600 mb-4 text-center'>
                        Welcome, Please enter your detail
                    </p>
                    <div aria-disabled className='mx-auto px-4 py-2 border border-slate-400 flex items-center justify-center gap-2 rounded-lg mb-4 relative cursor-not-allowed group'>
                        <img src={google} alt="" className='w-7' />
                        <p className='text-md font-semibold'>Login With Google</p>
                        <p className='invisible group-hover:visible w-full absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-sm text-center rounded-md'>Sorry this feature is not available yet 😁</p>
                    </div>
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t-2 border-gray-400"></div>
                        <span className="mx-4 text-gray-500">or</span>
                        <div className="flex-grow border-t-2 border-gray-400"></div>
                    </div>
                    <FormLoginAdmin />
                </div>
            </div>
        </>
    )
}

export default AdminLogin
