"use client";

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function NewEmployee() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        email: "",
        dob: "",
        mobile: "",
        password: "",
        coverImage: "",
        role: "admin"
    })
    const [imagePreview, setImagePreview] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
                console.log
                setUser({ ...user, coverImage: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const add = async () => {
        try {
            const response = await axios.post("/api/users/addnew", user);
            console.log("Signup Success", response.data);

            window.location.reload()
            router.push("/login")
        } catch (error: any) {
            console.log("Error Adding employee", error.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center py-2 min-h-screen">
            <h1 className="text-4xl">Add New Employee</h1><br />
            <div>
                <label className="block">
                    <span className="text-gray-700">Cover Image:</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full rounded-md border border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </label>
                {imagePreview && <img src={imagePreview} alt="Cover Image Preview" width="300px" height="300px" />}
            </div><br />
            <label htmlFor="name"></label>
            <input
                className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
                id="name"
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="name"
            />
            <label htmlFor="email"></label>
            <input
                className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="Date of Birth"></label>
            <input
                className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
                id="dob"
                type="date"
                value={user.dob}
                onChange={(e) => setUser({ ...user, dob: e.target.value })}
                placeholder="dob"
            />
            <label htmlFor="Mobile no"></label>
            <input
                className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
                id="mobile"
                type="number"
                value={user.mobile}
                onChange={(e) => setUser({ ...user, mobile: e.target.value })}
                placeholder="Mobile no"
            />

            <label htmlFor="password"></label>
            <input
                className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <label htmlFor="role">Role:</label>
            <select
                className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
                id="role"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
            </select>
            {user.role && (<p>{user.role}</p>)}

            <button
                className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
                onClick={add}
            >Add</button>
        </div>
    )
}

