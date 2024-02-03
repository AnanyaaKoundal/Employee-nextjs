import mongoose from "mongoose";

export async function connect() {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined");
        }

        await mongoose.connect(process.env.MONGO_URL);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });

        connection.on('error', (err) => {
            console.error("MongoDB connection error:", err);
        });

        connection.on('disconnected', () => {
            console.log("MongoDB disconnected");
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}
