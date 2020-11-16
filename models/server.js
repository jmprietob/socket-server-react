//Servidor express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Socket = require('./socket');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer(this.app);

        //Configuración del socket server
        this.io = socketio(this.server, {/* configuraciones */ });

    }

    middlewares() {
        //desplegar directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        //cors
        this.app.use(cors());
    }

    configurarSockets() {
        new Socket(this.io); 
    }

    execute() {
        //Inicializar midlewares
        this.middlewares();

        //inicializar sockets
        this.configurarSockets();

        //inicilizar server
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }
}

module.exports = Server;