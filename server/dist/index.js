import dotenv from "dotenv";
dotenv.config();
import http from "http";
import connectTODb from "./db/mongodb.js";
import app from "./app.js";
import { Server } from "socket.io";
const port = process.env.PORT || 4000;
async function startServer() {
    try {
        await connectTODb();
        const server = http.createServer(app);
        const io = new Server(server, {
            cors: { origin: "*" },
        });
        io.on("connection", socket => {
            console.log("User connected:", socket.id);
            socket.on("join", user => {
                socket.data.user = user;
                socket.broadcast.emit("user-joined", {
                    id: socket.id,
                    user,
                });
            });
            socket.on("move", data => {
                socket.broadcast.emit("player-move", {
                    id: socket.id,
                    ...data,
                });
            });
            socket.on("join-room", roomId => {
                socket.join(roomId);
            });
            socket.on("disconnect", () => {
                socket.broadcast.emit("user-left", socket.id);
            });
        });
        server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
    catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}
startServer();
