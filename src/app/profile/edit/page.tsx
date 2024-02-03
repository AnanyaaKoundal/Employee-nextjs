"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function UserEditPage({ params }: any) {
    const router = useRouter();
    const [imagePreview, setImagePreview] = useState<string>("");
    const [data, setData] = useState({
        name: "",
        coverImage: "",
    });
    useEffect(() => {
        const getUserDetails = async () => {
            const res = await axios.get('/api/users/update')
            setData(res.data.data);
            console.log(data)
        }
        getUserDetails();
    }
        , [])

        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setImagePreview(reader.result as string);
                    console.log
                    setData({ ...data, coverImage: reader.result as string });
                };
                reader.readAsDataURL(file);
            }
        };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put("/api/users/update", data);
            console.log("Update Success", response.data);

            router.push("/profile")
        } catch (error: any) {
            console.log("Error Updating user", error.message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value as string });
    };

    return (
        <div className="flex flex-col items-center justify-center py-2 min-h-screen">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
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
                <label>
                    Name:
                    <input
                        className='border border-rounded p-2'
                        placeholder='Add new name'
                        type="text" name="name" value={data.name as string} onChange={handleChange} />
                </label><br /><br />

                <button
                    className='border border-rounded p-2' type="submit">Save Changes</button>
            </form>
        </div>
    );
};
