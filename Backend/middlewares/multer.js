import multer from 'multer';
import express from "express"

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './uploads');
    },

    filename: (req, file, cb)=> {
        console.log(file, "filename")
        cb(null, Date.now() +"-"+ file.originalname);
    }
});

const upload = multer({storage: storage});

export default upload

