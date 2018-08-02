import http from 'http';

import SocketIO from 'socket.io';

export class Socket {
	private static io: SocketIO.Server;

	private static sockets: {
		[key: string]: SocketIO.Socket;
	};

	public static initialize(server: http.Server) {
		this.io = SocketIO(server);	

		this.sockets = {};

		this.io.on('connection', (socket) => {
			this.sockets[socket.id] = socket;
			console.log(`${socket.id} connected`);

			socket.emit('event', {
				'message': 'connect',
			});

			socket.on('event', (event) => {
				console.log(event.message);
			});

			socket.on('disconnect', () => {
				delete this.sockets[socket.id];
				console.log(`${socket.id} disconnected`);
			});
		});
	}

	public static emit(message: number | string) {
		console.log(`message: ${message}`);
		console.log(`socket count: ${this.sockets.length}`);
		Object.values(this.sockets).forEach((socket) => {
			console.log(`socket id: ${socket.id}`);

			socket.emit('event', {
				'message': message,
			});
		});
	}
}