import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors
app.use(cors());

// Routes
app.use('/', userRoutes)



app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
})