'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import debounce from 'lodash.debounce';
import ThemeToggle from './ThemeToggle';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // this is debounced function for handling search submissions
  const onSubmit = debounce((data) => {
    if (data.moviesearch.length >= 3) {
      router.push(`/search?query=${data.moviesearch}`);
    }
  }, 300);

  return (
    <div className="navbar bg-rose-100 flex justify-between items-center p-4">

      <div className='mt-1'>
        <Link href="/" className="text-xl font-mono">
          <h1 style={{ color: '#00264d' }} className="italic font-bold text-nowrap">Movie Hub</h1>
        </Link>
      </div>

      
      <form onSubmit={handleSubmit(onSubmit)} className="flex-grow max-w-xs mx-auto">
        <div className="flex rounded-md border-2 border-blue-500 overflow-hidden">
          <input
            type="text"
            placeholder="Search Something..."
            className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
            {...register("moviesearch", { minLength: 3 })}
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-[#007bff] px-5"
            disabled={watch("moviesearch")?.length < 3}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="fill-white"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </button>
        </div>
        {errors.moviesearch && (
          <p className="text-red-500 text-xs mt-1">Search term must be at least 3 characters</p>
        )}
      </form>

     
      <div className="flex items-center space-x-3 m-1">
        <ThemeToggle />

  
        <button className="md:hidden" onClick={toggleDrawer}>
          {drawerOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {drawerOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-rose-200 z-10 flex flex-col items-center p-8 md:hidden">
          <button
            className="self-end text-gray-800 mb-8"
            onClick={toggleDrawer}
          >
            <AiOutlineClose size={24} />
          </button>
          <ul className="flex flex-col gap-6 mt-8 text-gray-800 text-xl">
            <li onClick={toggleDrawer}>
              <Link href="/">Home</Link>
            </li>
            <li onClick={toggleDrawer}>
              <Link href="/watchlist">Watchlist</Link>
            </li>
          </ul>
        </div>
      )}

      
      <div className="hidden md:flex m-1">
        <ul className="flex gap-6">
          <li className="font-sans" style={{ color: '#00264d', fontSize: '18px' }}>
            <Link href="/">Home</Link>
          </li>
          <li className="font-sans" style={{ color: '#00264d', fontSize: '18px' }}>
            <Link href="/watchlist">Watchlist</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
