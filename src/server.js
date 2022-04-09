const fileUpload = require('express-fileupload');
const express = require('express');
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;
const httpServer = createServer(app)

const usersRout = require('./routes/users.js');
const { SOCKET } = require('./controllers/users.js');

app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.use('/data/files', express.static(path.join(process.cwd(),'src','files')));

app.use('/', usersRout, (req, res) => {
    io.on("connection", (socket) => {
        SOCKET(io, socket, req, res);
    })
});

const io = new Server(httpServer,{
    cors: {
      origin: "http://localhost:5000"
    }
})

io.on("connection", (socket) => {
    SOCKET(io, socket);
})

app.listen(PORT, () => console.log('http://localhost:'+PORT));