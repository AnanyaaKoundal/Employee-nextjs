// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

// Establish database connection
connect();

// Define the DELETE route handler
export async function DELETE(request: NextRequest, {params}: any) {
    try {
        // Extract employeeId from request body
        console.log(request.body);
        console.log(params.id);
        const id  = params.id;
        // // Check if employee ID is provided
        if (!id) {
            return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
        }

        // // Find the user by ID and delete it
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json({ error: "Employee not found" }, { status: 404 });
        }

        // Return success response
        return NextResponse.json({ message: "Employee deleted successfully" });
    } catch (error: any) {
        // Handle any errors and return error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
