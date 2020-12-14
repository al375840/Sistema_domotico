"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const PORT = process.env.PORT || 3000;
//createConnection().catch((error) => console.log(error));
const app = express_1.default().listen(PORT, () => {
    console.log(`Escuchando en ${PORT}`);
});
let io = new socket_io_1.Server(app, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
        credentials: true,
    },
});
/* io.on("connection", (socket) => {
    var timeout: NodeJS.Timeout;

    

    const emitChanges = ()=> {
        getMessages().then((data: Message[]) => {
            let messages:string[] = []
            data.forEach((msg) => messages.push(msg.content));
            console.log(messages);
            io.emit("messages", messages);
        });
    }

    emitChanges()
    console.log("nueva conexión");

    socket.on("emmitter", () => {
        console.log("Añadido emmiter");
        timeout = setTimeout(() => {
            console.log("conexion lost");
            io.emit("conexionlost");
        }, 20000);
    });

    socket.on("addMessage", (msgs: string[]) => {
        timeout.refresh();
        if (msgs != null && msgs.length > 0) {
            msgs.forEach(element => {
                addMessage(element).then(()=>{emitChanges()})
            });
        }
    });
}); */
