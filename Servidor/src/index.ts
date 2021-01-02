import { createConnection } from "typeorm";
import { Controller } from "./controllers/controller";
import { SocketServer } from "./server";
import "reflect-metadata";
import { IController } from "./controllers/icontroller";

createConnection()
	.then((c) => {
		console.log(
			"############################### Conexión con postgres establecida ##############################"
		);
		let controller:IController = new Controller(c);
		let server: SocketServer = new SocketServer(controller)
		server.start()
	})
	.catch((error) => console.log(error));