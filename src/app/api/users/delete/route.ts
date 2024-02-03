import { getDataFromtoken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function DELETE(request: NextRequest) {
    try {
        // Extract user ID from token or request body, depending on your authentication method
        const userId = await getDataFromtoken(request);

        // Check if user ID is valid (optional)
        if (!userId) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        // Find the user by ID and delete it
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
