
const express =require("express");
const connectDB = require("./database/db")
const userRouter = require("./routes/userRoutes");

const eventRouter =require("./routes/eventRoutes");
const cors=require("cors");
const path=require("path");
const {config}=require("./config/config");
const app = express();
const db = connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/uploads/", express.static(path.resolve(__dirname, "../uploads")));
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/event", eventRouter);

const PORT = config.env.app.port;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
