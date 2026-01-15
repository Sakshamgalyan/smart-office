import dotenv from "dotenv";
dotenv.config();
import http from "http";
import connectTODb from "./db/mongodb.js";
import app from "./app.js";
const port = process.env.PORT || 4000;
async function startServer() {
    try {
        await connectTODb();
        const server = http.createServer(app);
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
