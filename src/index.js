import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join} from 'path'
import connectDB from "./config/database.js";
import app from "./app.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname (__filename);



dotenv.config({
    path: join(__dirname, '../../.env')
});

const startServer = async() => {
    try {
        await connectDB();

        app.on("error", (error)=>{
            console.log("error", error);
            throw error;
        }); 
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server is running on port: ${process.env.PORT || 8000} `);

        })
    } catch (error) {
        console.log("MongoDB connection failed", error);
    }
}

startServer();
