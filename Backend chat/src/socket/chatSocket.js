import { Server } from "socket.io";

let messages=[{message:"Hola, Cómo le ha ido?",hour:1676133498585}]

export const Socket=(server)=>{
    const io=new Server(server)

    io.on("connection",(socket)=>{
        console.log("usuario conectado",socket.id
        )

        const sendMessaje=()=>{
            io.emit("server:getMessaje",messages)
        }

        sendMessaje()

        socket.on("client:addMessaje",(message)=>{
            // messages=[...messages,message]   cuando se mandan datos de agregar
            messages.push(message)
            sendMessaje()
        })

        socket.on("disconnect",()=>{
            console.log("usuario desconectado",socket.id)
        })
    })
}