import express from "express";
import { Socket } from "./socket/chatSocket.js";

const app=express()

app.set("Port",4000)

const server=app.listen(app.get("Port"),()=>{
    console.log("servidor corriendo por el puerto",app.get("Port"))
})

Socket(server)