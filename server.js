import express from 'express'
import mongoose from 'mongoose'
import freeDocNotifications from "./dbFreeDocNoti.js"
import patientsToday from "./dbPatientsToday.js"
import doctors from './dbDoctors.js'
import users from './dbUsers.js'
import Cors from "cors"

const app=express()
const port= process.env.port || 8001
const connectionUrl = 'mongodb+srv://admin:5OqQw0B1zLNvDhYt@cluster0.npypzlq.mongodb.net/?retryWrites=true&w=majority'

app.use(express.json())
app.use(Cors())

mongoose.connect(connectionUrl,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true
})

app.get("/",(req,res)=>res.status(200).send("wassup doc"))

app.get('/rmp',(req,res)=>{
    freeDocNotifications.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.post('/rmp',(req,res)=>{
    const freeDocNotification=req.body
    freeDocNotifications.create(freeDocNotification,(err,data)=>{
        if (err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.post('/doc',(req,res)=>{
    const patientToday=req.body
    patientsToday.create(patientToday,(err,data)=>{
        if (err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.get('/doc',(req,res)=>{
    patientsToday.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.get('/login',(req,res)=>{
    users.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.get('/booking',(req,res)=>{
    doctors.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.post('/booking',(req,res)=>{
    const doctorsList=req.body
    doctors.create(doctorsList,(err,data)=>{
        if (err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})
app.listen(port , ()=> console.log(`listening on port ${port}`))