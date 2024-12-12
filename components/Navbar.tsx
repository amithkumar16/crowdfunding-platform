"use client"

import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)
  return (
    <nav className='bg-blue-950 text-white flex justify-between  items-center px-4 h-16'>
      <Link href="/">
        <div className="logo font-bold text-lg cursor-pointer">
          GetmeAchai!
        </div>
      </Link>

      <div className='relative'>
        {session && <><button onClick={() => setshowdropdown(!showdropdown)} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className=" mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
        </button>
          <div
            id="dropdownHover"
            className={`${showdropdown ? "block" : "hidden"} absolute left-[185px] z-10 bg-slate-500 text-black font-bold rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
              <li>
                <Link href="/Dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              
              <li>
                <Link href={`${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your page</Link>
              </li>
              <li>
                <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
              </li>
            </ul>
          </div>

        </>
        }
        {!session && <Link href={"/login"}>
          <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button></Link>}

        {session &&
          <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => { signOut() }}>Logout</button>}


      </div>
    </nav>
  )
}

export default Navbar
