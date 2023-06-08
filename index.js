const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { connection } = require("./config/db");
const { userRout } = require("./routs/userRouts");
const cors = require("cors");
var jwt = require("jsonwebtoken");
const { showMessage } = require("./util/format");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/user", userRout);
app.get("/", (req, res) => {
  res.send("hello");
});

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("1 user connect");
  let deco
  socket.on("joinRoom", (msg) => {
      let decoded = jwt.verify(msg, 'yuvraj');
      deco=decoded

    socket.join("anonymus")
    socket.emit("message",showMessage("myServer","welcome to my server"))
   
    socket.broadcast.to("anonymus").emit("roomusers",{
        room:"anonymus",
        users:{id:decoded.userId,username:decoded.username}
    })

    console.log(decoded);
  });
    

  socket.on("chatmessage",(msg)=>{
    console.log(deco,"in cht")
         socket.broadcast.to("anonymus").emit("message",showMessage(deco.username,msg))

  })




  socket.on("disconnect", () => {
    console.log("user left");
  });
});

server.listen(4500, async () => {
  try {
    await connection;
    console.log("connected to DB at port 4500");
  } catch (error) {
    console.log(error);
  }
});
