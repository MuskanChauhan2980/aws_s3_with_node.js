 const express=require('express');
 const {generateSignedUrl} =require('./s3');
 require("dotenv").config();
 const app=express();
 const PORT=3000;

 app.get("/upload-url",(req,res)=>{
    const {filename ,contentType} =req.query;
    if(!filename||!contentType){
        return res.status(400)
    }
 })
