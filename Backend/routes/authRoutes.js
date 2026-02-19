import express from 'express';
import users from "../models/users.js";
import jwt from 'jsonwebtoken';
import TokenAuth from '../middlewares/checkTokens.js';
import upload from '../middlewares/multer.js';
import bcrypt from 'bcryptjs'



const router = express.Router();
const key = process.env.TOKEN_KEY  //token key...



//for registering new users with images...
router.post('/signup', upload.single("image"), async (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;
    // const image = req.file.filename;

    try {
        const existUser = await users.findOne({ email: email });
        console.log(existUser);

        if (existUser) {
            return res.status(401).json({ msg: 'User is already registered', success: false })
        }

        //hashing password
        const salt = await bcrypt.genSalt(10); // for security level
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = users.create({
            username,
            email,
            password: hashedPass,
            image,
        })

        return res.status(201).json({ msg: 'You have created your account', success: true, newUser })

    }

    catch (error) {
        res.status(500).json(error.message)
    }
})





//for login handling...
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {

        const existUser = await users.findOne({ email });
        console.log(existUser, 'is existuser');
        // console.log(existUser.username, 'username of existuser');
        // console.log(existUser.email, 'email of existuser');

        if (!existUser) {
            return res.status(401).json({ msg: 'User Not Found', login: false })
        }


        // comparing hash password with current pass...
        const PassMatch = await bcrypt.compare(password, existUser?.password)
        if (!PassMatch) {
            return res.status(401).json({ msg: 'Wrong Credentials', login: false })
        }

        //granting and sending cookies...
        const token = jwt.sign({ id: existUser._id }, key);

        res.cookie('tokens', token, {
            httpOnly: true,
            sameSite: 'lax',
        });


        return res.status(200).json({ msg: 'Login Granted', login: true })
    }

    catch (error) {
        res.status(500).json({ msg: 'internal system error' })
        console.log(error.message)
    }

});



//for logout handling...
router.post('/logout', TokenAuth, async (req, res) => {
    try {

        console.log(req.cookies?.tokens, 'found cookies')
        res.clearCookie('tokens', { httpOnly: true, secure: false });


        return res.status(200).json({ msg: 'logged Out successfully', success: true })
    }
    catch (error) {
        res.status(500).json(error.message)
    }
});


// for current user details
router.get('/me', TokenAuth, (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user,
        });
    }
    catch (error) {
        res.status(500).json(error.message)
    }
})

export default router