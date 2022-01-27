import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router.js";
dotenv.config();
const port = parseInt(process.env.PORT) || 3000;
const app = express();
app.use(express.json());
//User routes from router js file
app.use("/", cors(), router);
//Listen
app.listen(port, () => {
  console.log(` ${port}`);
});
