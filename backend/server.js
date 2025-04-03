import express from 'express';
import dotenv from "dotenv";
import cors from "cors"; // Import CORS
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import path from "path"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to Database BEFORE starting the server
connectDB();

// ✅ Enable CORS for frontend (http://localhost:5173)
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

const __dirname=path.resolve();
app.use(express.json());


app.use("/api/products", productRoutes);

if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
