 const express=require('express');
 const {generateSignedUrl} =require('./s3');
 require("dotenv").config();
 const app=express();
 const PORT=3000;

 app.get("/upload-url",(req,res)=>{
    const {filename ,contentType} =req.query;
    if(!filename||!contentType){
        return res.status(400).json({error:'filename and content type is require'})
    }

    const key =`uploads/${filename}`;
    const url= generateSignedUrl({method:"PUT",key,contentType});
    res.json({url,key});
 })


 app.get("/download-url",(req,res)=>{
    const {key} =req.query;
    if(!key){
        return res.status(400).json({error:"Key is require"})
    }
    const url= generateSignedUrl({method:"GET",key});
    res.json({url});
 })

 app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
 })