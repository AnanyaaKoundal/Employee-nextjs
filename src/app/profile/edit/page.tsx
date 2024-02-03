"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserData {
    email: string;
    // Add other properties as needed
  }

export default function UserProfilePage({ params }: any) {
    const [data, setData] = useState<UserData | null>(null);
    useEffect(()=>{
        const getUserDetails = async () => {
            const res = await axios.get('/api/users/me')
            setData(res.data.data);
            console.log(data)
        }
        getUserDetails();
    }
    , [])

    return (

        <div className="flex flex-col py-2 items-center justify-center min-h-screen text-black">
            <p className="text-4xl">Hello! {params.id}</p>
            <br />
            <p>Profile Page</p>
            {data && <p>{data.email}</p>}
        </div>
    )
}