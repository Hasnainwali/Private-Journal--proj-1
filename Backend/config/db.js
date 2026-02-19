import mongoose from "mongoose";


const dbConnection = async () => {
    try {
        // await mongoose.connect('mongodb://localhost:27017/Journal')
        await mongoose.connect(process.env.ONLINE_DB_URI)
        console.log('mongodb online is connected');
    }
    
    catch (error) {
        console.log(error.message)
    }
}


export default dbConnection;