import express from "express";
import cors from "cors"

import userRoute from "./routes/user.routes";
import transcation from "./routes/transaction.route";


const app=express()
app.use(express.json())
app.use(cors())

app.use("/api/v1/user",userRoute)
app.use("/api/v1/transaction",transcation)


app.listen(process.env._PORT,()=>{
    console.log("Server is Running")
})