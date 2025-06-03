// Importing necessary modules
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

// Importing route handlers
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import userRouter from "./routes/user.routes.js";
// Importing custom logger middleware
import logger from "./middleware/logger.js";

// Loading environment variables from .env file
dotenv.config()
// Initialize Express server instance
const app = express();

// ------------------ MIDDLEWARES ------------------
// Middleware to parse incoming JSON request bodies
app.use(express.json())
// Custom middleware to log incoming requests (timestamp, method, path)
app.use(logger);

// ------------------ ROUTE MOUNTING ------------------
// Route handler for product-related endpoints
app.use("/products", productRouter)
// Route handler for cart-related endpoints 
app.use("/cart",cartRouter)
// Route handler for user registration and login
app.use("/user",userRouter)

// ------------------ DATABASE CONNECTION ------------------
// Connecting to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017")
    .then(() => {
        console.log("Connected to MongoDB");
          // Starting the server on the port defined in .env or default to 5000
        app.listen(process.env.PORT||5000, () => {
            console.log(`server listening at port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

