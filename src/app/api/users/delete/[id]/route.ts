import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function DELETE(request: NextRequest, {params}: any) {
    try {

        console.log(request.body);
        console.log(params.id);
        const id  = params.id;

        if (!id) {
            return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json({ error: "Employee not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Employee deleted successfully" });
    } catch (error: any) {

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
