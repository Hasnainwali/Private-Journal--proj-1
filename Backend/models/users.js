import mongoose from "mongoose";


//creating schema 
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: String,
},
    { timestamps: true }
);

// making model...
const Users = mongoose.model('Users', userSchema);

export default Users;