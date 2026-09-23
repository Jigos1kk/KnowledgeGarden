import express from "express";
import router from './routes/index.js';

const app = express();

app.use(express.json());

app.use("/api", router)

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000/api")
})