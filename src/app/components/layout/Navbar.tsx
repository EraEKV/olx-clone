"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import router from 'next/router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

//   const handleLogout = () => {
//     if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
//       localStorage.removeItem('token');
//       setToken(null);
//     }
//     router.push('/login');
//   };

  return (
    <nav className="font-mono  border-b-2 border-gray-200 shadow-sm rounded-lg">
      <div className="flex justify-between py-6 w-[95%] sm:w-[90%] mx-auto items-center">
        <div className='items-center flex w-full'>
          <Link href="/" className="group transition duration-200 ease-in-out text-xl md:text-2xl lg:text-2xl font-semibold hover:text-emerald-500">
            {/* Blog<span className="group-hover:text-emerald-500 text-gray-500 transition duration-200 ease-in-out">Post</span> */}
            OlY
          </Link>

          {/* <div className="relative">
            <input
              id='search'
              className='ml-3 w-[150px] sm:ml-5 sm:w-full pr-10 pl-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-150 ease-in-out'
              type="text"
              placeholder='Search'
              value={query}
              onChange={handleChange}
            />
            <Link href={`/search?query=${encodeURIComponent(query)}`} legacyBehavior>
              <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </Link>
          </div> */}
        </div>

        <div className="hidden sm:flex space-x-5 text-lg items-center">
          <Link className="hover:text-cyan-500 transition duration-200 ease-in-out" href="/">Home</Link>
          <Link className="hover:text-cyan-500 transition duration-200 ease-in-out" href="/products">Products</Link>
          <Link className="py-1 px-3 border-2 border-black whitespace-nowrap transition duration-200 ease-in-out hover:bg-black hover:text-white rounded-lg" href="/upload">Add product</Link>
          {/* {token ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 cursor-pointer hover:text-cyan-500 transition duration-200 ease-in-out"
              onClick={handleLogout}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
          ) : (
            <Link className="hover:text-cyan-500 transition duration-200 ease-in-out" href="/login">
              Login
            </Link>
          )} */}
        </div>

        <div className="sm:hidden block cursor-pointer" onClick={toggleMenu}>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-white shadow-md rounded-b-lg border-t-[1px] border-t-gray-300">
          <div className='space-y-3 py-3 w-[90%] mx-auto'>
            <Link href="/" className="block text-xl text-center font-bold border-b-[1px] border-gray-300 pb-2">Home</Link>
            <Link href="/blogs" className="block text-xl text-center font-bold border-b-[1px] border-gray-300 pb-2">Products</Link>
            <Link href="/about" className="block text-xl text-center font-bold border-b-[1px] border-gray-300 pb-2">About</Link>
            <Link className="mx-auto py-1 px-3 border-2 border-black transition duration-200 ease-in-out hover:bg-black hover:text-white rounded-lg" href="/upload">Add product</Link>
          
            {/* {token ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5 text-gray-600 cursor-pointer"
                onClick={handleLogout}
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>
            ) : (
              <Link href="/login" className="block text-xl text-center font-bold pb-2">Login</Link>
            )} */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;