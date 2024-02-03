import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
connect();

export async function POST(request: NextRequest) {
    try {
        
        // Validate required fields in the request body
        const { name, email, dob, mobile, password, coverImage, role } =await request.json();
        if (!name || !email || !dob || !mobile || !password || !role) {
            console.log(name, email, dob, mobile, password, role)
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        console.log("IN")
        
        // Check if user already exists
        
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        // Set isAdmin based on role
        const isAdmin = role.toLowerCase() === 'admin';
        
        
        // Create and save new user
        const newUser = new User({
            name,
            email: email.toLowerCase(),
            DOB:dob,
            mobile,
            password: hashedPassword,
            coverImage,
            isAdmin
        });
        console.log("Before")
        try{
        const savedUser = await newUser.save();
        console.log(savedUser);
        console.log("After")
        
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });}
        catch(err){
            console.log(err)
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
