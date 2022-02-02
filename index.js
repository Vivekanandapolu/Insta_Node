import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router.js";
import sequelize from "./uitility/db.js";
import path from "path";
dotenv.config();
const port = parseInt(process.env.PORT) || 3000;
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
//User routes from router js file
app.use("/", cors(), router);
app.get("/welcome", (req, res) => {
  res.send("Welcome to Insta__Node Application");
});
//Listen
app.listen(port, () => {
  console.log(` Insta Node is running on :${port}`);
});
sequelize.sync({ force: false }).catch((error) => {
  console.log(error);
});
