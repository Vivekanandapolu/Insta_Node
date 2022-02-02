//Import Modules or Paths
import Sequelize from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import UserModel from "../src/models/users.model.js";
import PostModel from "../src/models/posts.model.js";
dotenv.config();
//sequelize connection setup for mariadb
const sequelize = new Sequelize(
  process.env.DB_NAME || "insta_db",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
      max: 3,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
  }
);
//Load Models
UserModel.init(sequelize);
PostModel.init(sequelize);

// Load all models
await fs.readdirAsync("./src/models").map((fileName) => {
  // ?? With ES6 should I System.import('./models/' + fileName)?
  let model = require("./models/" + fileName);
  /* NEW es6 style...? */
  model.init(sequelize);
});

// associate
// const models = sequelize.models;
// _.map(Object.keys(models), (n) => models[n])
//   .filter((m) => m.associate !== undefined)
//   .forEach((m) => m.associate(models));
export default sequelize;
