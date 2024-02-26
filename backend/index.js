import express, {json} from "express";
import { db } from "./db/db.js";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import oAuthRoutes from "./routes/oAuthRoute.js"
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use("/api/auth", userRoutes);
app.use("/api/chat", messageRoutes);
app.use("/api/auth", oAuthRoutes);
app.get("/", (_req, res) => res.status(200).send("Ok"))
app.get("/policy", (_req, res) => res.status(200).send("Política de privacidade"))
app.get("/terms", (_req, res) => res.status(200).send("Termos de serviços"))

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