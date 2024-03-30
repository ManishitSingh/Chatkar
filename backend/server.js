//imports
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoute.js';
import userRoutes from './routes/userRoutes.js'
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';
import path from 'path';


dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
//middlewares
app.use(cookieParser());
app.use(express.json());//to parse json data
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes);
app.use(express.static(path.join(__dirname,"/fontend/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})
//routes


//server
server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
})