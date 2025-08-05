 const express= require("express");
 const cors= require("cors");
 const s3Routes= require("./route/s3Router");

 const app= express();
 app.use(cors());
 app.use(express.json());
 app.use("/s3", s3Routes);
 const PORT = process.env.PORT ||3000;
 app.listen(PORT,()=>{
   console.log(`Server runing on http://localhost:${PORT}`)
 })