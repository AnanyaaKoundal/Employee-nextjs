"use client"
import Link from "next/link";
import React, { useState } from "react";
import { Logo } from "./Logo";
import Button from "../Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const a = (async () => {
    const res = await axios.get('/api/users/me')
    if (res.data.data && res.data.data.mobile) {
      setIsLoggedIn(true);
    };
    if (res.data.data && res.data.data.isAdmin) {
      setIsAdmin(true);
    };
  })();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successful')

      window.location.reload()
      router.push('/login')
    } catch (error: any) {
      console.log("Logout failed", error.message);
      toast.error(error.message)
    }
  }

  const links = [
    {
      id: 1,
      link: `profile`,
      name: "Profile",
      authRequired: true,
      admin:false
    },
    {
      id: 2,
      link: "add-employee",
      name: "Add New Employee",
      authRequired: true,
      adminReq: true
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-customBlue fixed nav shadow-sm shadow-black">
      <div>
        <h1 className="text-5xl font-signature ml-2">
          <a
            className="link-underline link-underline-black"
            href=""
            target="_blank"
            rel="noreferrer"
          >
            <Logo />
          </a>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {
          isLoggedIn && (
            <li
              key="1"
              className="nav-links px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200 link-underline mt-2"
            >
              <Link href="profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && isAdmin && (
            <>
              <li
                key="2"
                className="nav-links px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200 link-underline mt-2"
              >
                <Link href="add-employee">Add new Employee</Link>
              </li>
              <li
                key="3"
                className="nav-links px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200 link-underline mt-2"
              >
                <Link href="search-employee">Search</Link>
              </li>
            </>
          )}

        {isLoggedIn ? (
          <li key="logout">
            <Button onClick={logout}>Logout</Button>
          </li>
        ) : (
          <>
          </>
        )}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;