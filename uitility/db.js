//Import Modules or Paths
import Sequelize from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import _ from "lodash";
import UserModel from "../src/models/users.model.js";
import PostModel from "../src/models/posts.model.js";
dotenv.config();
const __dirname = path.resolve();
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

const modelsDir = path.normalize(`${__dirname}/src/models`);
console.log(modelsDir);
fs.readdirSync(modelsDir)
  .filter((file) => file.indexOf(".") !== 0 && file.indexOf(".map") === -1)
  // import model files and save model names
  .forEach((file) => {
    console.info(`Loading model file ${file}`);
    const model = sequelize.import(path.join(modelsDir, file));
    db[model.name] = model;
  });

// calling all the associate function, in order to make the association between the models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default sequelize;
