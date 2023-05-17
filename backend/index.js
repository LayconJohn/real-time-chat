import express, {json} from "express";
import { db } from "./db/db.js";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import messageRoutes from "./routes/messageRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use("/api/auth", userRoutes);
app.use("/api/chat", messageRoutes);

db
    .then(() => {
        console.log("DB connection established");
    })
    .catch((err) => {
        console.log(err.message);
    });


const server = app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT)
});