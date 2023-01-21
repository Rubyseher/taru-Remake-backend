import mongoose from "mongoose";

const patients =mongoose.Schema({
    name:String,
    age:Number,
    dob:String,
    meetLink:String,
    time:String,
    currentDoctor:String
})

export default mongoose.model('patientsToday',patients)