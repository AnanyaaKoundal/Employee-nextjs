"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserData {
    email: string;
    name: String;
    mobile: Number;
    DOB: Date;
    // coverImage:string;
}

export default function UserProfilePage({ params }: any) {
    const [data, setData] = useState<UserData | "">("");
    useEffect(() => {
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
            <br />
            <div className="containers">
                <div className="login-box">
                    {/* <h2 className="text-4xl">Hello! {data && data.name}</h2> */}
                    <div className="show">
                        <div className="img">
                            <img src={data && data.coverImage} />
                        </div>
                        <div className="line"></div>
                        <div className="details">
                            <h3><b>Name</b></h3>
                            {data && data.name} <br /> <br />
                            <h3><b>Email</b></h3>
                            {data && data.email}<br /> <br />
                            <h3><b>Date of Birth</b></h3>
                            {data && data.DOB}<br /> <br />
                            <h3><b>Mobile no</b></h3>
                            {data && data.mobile}<br /> <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}