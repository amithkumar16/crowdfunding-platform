import mongoose from "mongoose";

const connectdb = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/chai', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectdb;
