import express from "express";
import cors from 'cors';
import dbConnection from "./config/db.js";
import cookieParser from "cookie-parser";
import env from 'dotenv'


//Importing models...
import journal from './models/journal.js';
import users from './models/users.js';



const app = express();
env.config();


//db connection...
dbConnection();


//builtin middlewares...
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://private-journal-frontend.vercel.app/',
    credentials: true,
}));

// Giving access to frontend for pictures in uplaods...
app.use('/images', express.static('./uploads'));



//checking backend...
app.get('/test', (req, res) => {
    return res.send('Backend is perfectly running...')
});



//for login and signup handling
import authRoutes from './routes/authRoutes.js'
app.use('/auth', authRoutes);


//for adding new journals in db...
import journalRoutes from './routes/journalRoutes.js'
app.use('/', journalRoutes);


// RestFul API's

app.get('/getdata', (req, res) => {
    const { name, Address, Role } = req.body;
    console.log(req.body);
})

app.post('/postdata', (req, res) => {
    const { name, Address, Role } = req.body;
    console.log(req.body);
})

app.put('/updatedata/:id', (req, res) => {
    res.status(200).json({ msg: 'data is updated' })
    console.log('your data has been updated');
})

app.patch('/patchdata/:id', (req, res) => {
    res.status(200).json({ msg: 'data is updated' })
    console.log('your data has been updated');
})

app.get('/delete/id', (req, res) => {
    res.status(200).json({ msg: 'data deleted' })
    console.log("your data is deleted");
})














//defining port listening...
const port = process.env.PORT;
app.listen(port, () => {
    try {
        console.log("backend is running on", port)
    }
    catch (error) {
        console.log(error.message)
    }
})