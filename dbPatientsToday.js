import mongoose from "mongoose";

const patients =mongoose.Schema({
    name:String,
    age:String,
    doc:String,
    meet:String,
    time:String,
})

export default mongoose.model('patientsToday',patients)