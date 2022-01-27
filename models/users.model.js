import { DataTypes } from "sequelize";
import sequelize from "../uitility/db.js";
const User = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
  },
});
export default User;
