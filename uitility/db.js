//Import Modules or Paths
import fs from "fs";
import Sequelize from "sequelize";
import path from "path";
import dotenv from "dotenv";
import _ from "lodash";
import UserModel from "../src/models/users.model.js";
import PostModel from "../src/models/posts.model.js";
const __dirname = path.resolve();
dotenv.config();

let models = [];
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
//Load models
//TODO: need to optimize
UserModel.init(sequelize);
PostModel.init(sequelize);
//Get Models
const modelsDir = path.normalize(`${__dirname}/src/models`);
(async () => {
  const files = fs.readdirSync(modelsDir).filter((file) => file);
  console.log(`Files:${files}`);
  await Promise.all(
    files.map(async (file) => {
      const model = await import(path.join(modelsDir, file));
      //Store model in models
      models.push({ name: model.default });
    })
  );
  //Model associations
  models.forEach((model) => {
    if (model.name.associate) {
      model.name.associate(models); //Required
    }
  });
})();
//Export sequelize connection
export default sequelize;
