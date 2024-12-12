import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true }, // String is shorthand for { type: String }
  name: { type: String },
  username: { type: String,required : true},
  profilepic: { type: String },
  coverpic: { type: String },
  razorpay_id: { type: String },
  razorpay_secret: { type: String },
  createdat: { type: Date, default: Date.now },
  updatedat: { type: Date, default: Date.now },
});

// Check for an existing model before creating it
export default mongoose.models.User || model("User", UserSchema);
