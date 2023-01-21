import mongoose from "mongoose";

const users =mongoose.Schema({
    name:String,
    type:String,
    age:Number,
    bloodGroup:String,
    phone:Number,
    address:String,
    dob:String,
    vitals:[
        { date :Date, 
        weight :String, 
        bp :String,
        prescription:String
        }
    ]
})

export default mongoose.model('users',users)