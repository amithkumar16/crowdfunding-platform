"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectdb from "@/db/connectdb"
import User from "@/models/User"
import { error } from "console"
export const initiate = async (amount, to_username, paymentform) => {
   try {
     // Connect to database
     await connectdb();
 
     // Initialize Razorpay instance
     var instance = new Razorpay({
       key_id: process.env.key_id,
       key_secret: process.env.key_secret,
     });
 
     // Create order
     let options = {
       amount: Number.parseInt(amount) * 100, // Convert to paise
       currency: "INR",
     };
     let x = await instance.orders.create(options);
 
     // Save payment details to the database
     await Payment.create({
       oid: x.id,
       amount: amount,
       to_user: to_username,
       name: paymentform.name,
       message: paymentform.message,
     });
 
     return x; // Return Razorpay order
   } catch (error) {
     console.error("Error in initiate function:", error);
     throw new Error("Failed to initiate payment.");
   }
 };

 export const fetchuser = async (username) => {
  try {
    await connectdb();
    console.log("Searching for user:", username);  // Log the username being searched
    let u = await User.findOne({ username: username });

    if (!u) {
      console.error("User not found");  // Log error if user is not found
      throw new Error("User not found");
    }

    let user = u.toObject(); // Convert the user document to a plain JavaScript object
    console.log("Fetched user from DB:", user);  // Log the user object
    return user;
  } catch (error) {
    console.error("Error in fetchuser:", error);
    throw new Error("Failed to fetch user.");
  }
};

 
 export const fetchpayments = async (username) => {
  try {
    await connectdb(); // Ensure the database connection is established
    let p = await Payment.find({ to_user: username, done: true }) // Filter where done is true
      .sort({ amount: -1 }) // Sort by amount in descending order
      .lean(); // Convert documents to plain JavaScript objects
    return p;
  } catch (error) {
    console.error("Error in fetchpayments:", error);
    throw new Error("Failed to fetch payments.");
  }
};



 export const updateprofile = async (data, oldusername) => {
  await connectdb();
  let ndata = Object.fromEntries(data);

  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username }); // Correctly checks for the new username
    if (u) {
      return { error: "Username already exists" }; // Return an object with an error message
    }
  }
  await User.updateOne({ email: ndata.email }, ndata); // Proceed with the update

  await Payment.updateMany({to_user:oldusername},{to_user:ndata.username})
}

 