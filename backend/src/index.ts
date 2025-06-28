import express from "express";
import cors from "cors"
import { configDotenv } from "dotenv";
import { jwtSign, jwtVerify } from "./utils/jwtGenAndSign";
configDotenv();
const app=express()
app.use(express.json())
app.use(cors())



app.listen(process.env._PORT,()=>{
    console.log("Server is Running")
})