import express from 'express'
import mongoose from 'mongoose'
import freeDocNotifications from "./dbFreeDocNoti.js"
import patientsToday from "./dbPatientsToday.js"
import doctors from './dbDoctors.js'
import users from './dbUsers.js'
import Cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = "3B8MSS$6(N2%%1NDhhdf6D091%7@@7da#0jdkjj%*jds*QQJUS9([Ra}"

const app = express()
const port = process.env.port || 8001
const connectionUrl = 'mongodb+srv://admin:5OqQw0B1zLNvDhYt@cluster0.npypzlq.mongodb.net/?retryWrites=true&w=majority'

app.use(express.json())
app.use(Cors())

mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    // useCreateIndex:true,
    useUnifiedTopology: true
})

app.get("/", (req, res) => res.status(200).send("wassup doc"))

app.get('/rmp', (req, res) => {
    freeDocNotifications.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

app.post('/rmp', (req, res) => {
    const freeDocNotification = req.body
    freeDocNotifications.create(freeDocNotification, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})




// app.delete('/doc',(req,res)=>{
//     try{
//         patientsToday.remove({_id: mongodb.ObjectID( req.params.id)});
//         return res.status(200).json({ success: true, msg: `Product Deleted ${req.params.id}` });
//     }
//     catch(err){
//         console.error(err);
//     }
// })

app.delete('/doc/:id', function (req, res) {
    let deleteID = req.params.id
    patientsToday.findOneAndDelete({ _id: deleteID }, function (err, doc) {
        if (err) {
            res.send(err)
        } else {
            if (doc == null) {
                res.send("Wrong id")
            } else {
                res.send(doc)
            }
        }

    });
})

app.get('/doc', (req, res) => {
    patientsToday.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

app.post('/register', async (req, res) => {
    const { fullName,
        age,
        bloodGroup,
        password,
        phone,
        address,
        dob,
    } = req.body

    const encryptedPassword = await bcrypt.hash(password, 10)
    try {
        const oldUser = await users.findOne({ phone })

        if (oldUser)
            return res.send({ error: "User exist" })
        await users.create({
            fullName,
            age,
            bloodGroup,
            password: encryptedPassword,
            phone,
            address,
            dob,
        })
        res.send({ status: "ok" })
    } catch (error) {
        res.send({ status: "error" })

    }
})

app.post('/login', async (req, res) => {
    const {
        password,
        phone,
    } = req.body

    const oldUser = await users.findOne({ phone })

    if (!oldUser)
        return res.json({ error: "User not found" })

    if (await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({phone:oldUser.phone}, JWT_SECRET)
        if (res.status(201))
            return res.json({ status: "ok", data: token })
        else
            return res.json({ error: "error" })
    }
   res.json({status:'error',error:'invalid password'})
})

app.post("/patient",async(req, res)=> {
    const {token} =req.body
    try {
        const user = jwt.verify(token, JWT_SECRET)
        console.log(user);
        const userPhone =user.phone
        users.findOne({phone:userPhone})
        .then((data)=>{
            console.log("hi");
            res.send({status:"ok",data:data})
        }).catch((error)=>{
            console.log("no");
            res.send({status:"error",data:error})
        })
    } catch (error) {
        console.log("noo");
        
    }
})

app.get('/booking', (req, res) => {
    doctors.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

app.post('/booking', (req, res) => {
    const doctorsList = req.body
    patientsToday.create(doctorsList, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})
app.listen(port, () => console.log(`listening on port ${port}`))