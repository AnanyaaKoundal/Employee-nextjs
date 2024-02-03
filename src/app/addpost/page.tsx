"use client"

import React, { useState } from 'react';
import axios from 'axios';

export default function WriteBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [file, setFile] = useState(null);

    const uploadFile = async (e:any) => {
        const file = e.target.files[0];

        if (file) {
            setFile(file);
        }
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        
        try {
            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                
                const response = await axios.post('https://api.imgbb.com/1/upload?key=3b6b9f4303fdec24f53db46d5961ecd0', formData);
                const imageUrl = response.data.data.url;
                
                // Now you can use the imageUrl as needed, such as saving it to state or sending it to a server
                console.log("1",imageUrl);
                setCoverImage(imageUrl)
                console.log("2",coverImage);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className='text-black flex flex-col items-center justify-center py-2 min-h-screen'>
            <h1 className='text-black text-3xl font-bold mb-4'>Write a Blog Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">
                        <span className="text-gray-700">Title:</span>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                    </label>
                </div>
                <div>
                    <label className="block">
                        <span className="text-gray-700">Content:</span>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
                    </label>
                </div>
                <div>
                    <label className="block">
                        <span className="text-gray-700">Cover Image:</span>
                        <input type="file" onChange={uploadFile} className="mt-1 block w-full rounded-md border border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                    </label>
                </div>
                <div>
                    <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">Submit</button>
                </div>
            </form>
        </div>
    );
}
