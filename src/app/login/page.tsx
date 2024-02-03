"use client";

import Link from "next/link"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    
    const router = useRouter();
    const [user, setUser]= useState({
        email:"",
        password:""
    })
    const [loader, setLoader]=useState(false);
    const [buttonDisabled, setButtonDisabled]= useState(false);
    const onLogin= async()=>{
        try {
            setLoader(true);
            const response= await axios.post("/api/users/login", user);
            console.log("Login Success", response.data);
            toast.success("Login Success");       
            window.location.reload()
            router.push('/');
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        }finally{
            setLoader(false);
        }
    }
    return(
        <div className="flex flex-col items-center justify-center py-2 min-h-screen">
            <h1 className="text-3xl">{loader? "Processing": "Login"}</h1>
            <br />
            <label htmlFor="email">Email</label>
            <input 
             className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
             id="email"
             type="email"
             value={user.email}
             onChange={(e)=>setUser({...user,email:e.target.value})}
            />
            <label htmlFor="password">Password</label>
            <input 
             className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
             id="password"
             type="password"
             value={user.password}
             onChange={(e)=>setUser({...user,password:e.target.value})}
            />
            <button
            className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
            onClick={onLogin}>{buttonDisabled? "No Login": "Login"}</button>
            <Link href="/signup">New User? Signup here.</Link>
        </div>
    )
}