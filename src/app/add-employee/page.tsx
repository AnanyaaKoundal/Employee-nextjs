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
        role: ""
    })
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = () => {
                    setUser({ ...user, coverImage: reader.result });
                };
                reader.readAsDataURL(file);
            } else {
                toast.error("Please select an image file.");
            }
        }
    };

    const handleSignup = async () => {
        try {
            // Convert base64 image to file for storing in the database
            const base64Image = user.coverImage.split(",")[1];
            const file = new File([atob(base64Image)], "coverImage.jpg", {
                type: "image/jpeg",
            });

            const formData = new FormData();
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("dob", user.dob);
            formData.append("mobile", user.mobile);
            formData.append("password", user.password);
            formData.append("role", user.role);
            formData.append("coverImage", file);

            const response = await axios.post("/api/users/addnew", formData);
            toast.success("Employee added successfully.");
            setUser({
                name: "",
                email: "",
                dob: "",
                mobile: "",
                password: "",
                role: "",
                coverImage: "", // Clear coverImage field after submission
            });
        } catch (error:any) {
            console.error("Error adding employee:", error.message);
            toast.error("Failed to add employee.");
        }
    };


    return (
        <div className="flex flex-col items-center justify-center py-2 min-h-screen">
            <h1 className="text-4xl">Add New Employee</h1><br />
            <div>
                <label className="block">
                    <span className="text-gray-700">Cover Image:</span>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="mt-1 block w-full rounded-md border border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </label>
                {user.coverImage && (<img width="300px" height="300px" src={user.coverImage} />)}
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

            <button
                className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
                onClick={handleSignup}
            >Add</button>
        </div>
    )
}