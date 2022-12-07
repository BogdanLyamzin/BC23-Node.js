const ws = new require("ws");

const wsServer = new ws.Server({port: 5000});

const sockets = [];

wsServer.on("connection", (socket)=> {
    // console.log("New frontend connected");
    sockets.push(socket)
    setTimeout(()=> {
        socket.send("Welcome to ws server")
    }, 3000)

    sockets.forEach(item => {
        if(item !== socket) {
            item.send("New member join us")
        }
    })
})