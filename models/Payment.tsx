import mongoose from "mongoose";
const { Schema,model } = mongoose;
const PaymentSchema = new Schema({
    name:{ type:String,required:true}, // String is shorthand for {type: String}
    to_user:{ type:String,required:true}, 
    oid:{ type:String,required:true}, 
    
    message:{ type:String},
   amount:{type:Number,required:true},
    createdat:{ type:Date,default:Date.now
    },
    updatedat:{ type:Date,default:Date.now
    },
    done:{type:Boolean,default:false},
  });

  export default mongoose.models.Payment || model("Payment",PaymentSchema); 