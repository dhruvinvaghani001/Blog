import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';


const Header = () => {
    const isAuth = useSelector(state => state.auth.status);
    const [acclass, setacClass] = useState(false);

    const navLinks = [
        {
            name: "Home",
            path: '/',
            active: true
        },
        {
            name: "Sign up",
            path: '/signup',
            active: !isAuth
        },
        {
            name: "Login",
            path: '/login',
            active: !isAuth
        },
        {
            name: 'All Posts',
            path: '/allposts',
            active: isAuth
        },
        {
            name: 'Create Post',
            path: '/addpost',
            active: isAuth
        },
        {
            name: "Admin",
            path: "/admin",
            active: isAuth
        }
    ]

    return (
        <>
            <nav className={`bg-newhite  border-b-2 border-indigo-500`}>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <img src="/vite.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap ">Blogger</span>
                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" onClick={() => { setacClass((prev)=>!prev) }} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`${acclass ? "active" : "inactive" } hidden w-full md:block md:w-auto" id="navbar-default`}>
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">

                            {
                                navLinks.map((iteam) => (
                                    iteam.active &&
                                    <li className='px-6 py-2 duration-400 rounded-md hover:bg-violet-400 hover:text-white'>
                                        <Link to={iteam.path} classNameName="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">{iteam.name}</Link>
                                    </li>))
                            }
                            {
                                isAuth && <li className='px-6 py-2 duration-400 rounded-md hover:bg-violet-400 hover:text-white'>
                                    <LogoutButton></LogoutButton>
                                </li>
                            }

                        </ul>
                    </div>
                </div>
            </nav>



        </>
    )
}

export default Header