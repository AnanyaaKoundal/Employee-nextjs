import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URL !);
        const connection= mongoose.connection;

        connection.on('connected', ()=>{
            console.log("MongoDB connected successfully")
        })
        connection.on('error', (err)=>{
            console.log("Something went wrong!!", err)
        })
    }catch(err){
        console.log("In dcConfig", err);
    }
}