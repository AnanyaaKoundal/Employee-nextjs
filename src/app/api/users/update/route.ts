import { getDataFromtoken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromtoken(request);
        const user = await User.findOne({ _id: userId }).select("name");
        return NextResponse.json({ message: "User Found", data: user.name })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

export async function PUT(request: NextRequest) 
{ 
    try { 
        const userId = await getDataFromtoken(request); 
        const { name, coverImage } = await request.json(); 
        await User.updateOne({ _id: userId }, { name, coverImage }); 
        return NextResponse.json({ message: "Name and cover image updated successfully" });
     } catch (error: any) { 
        return NextResponse.json({ error: error.message }, { status: 400 }); 
    } 
}