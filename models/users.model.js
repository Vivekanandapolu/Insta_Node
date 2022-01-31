import { text } from "express";
import { DataTypes } from "sequelize";
import sequelize from "../uitility/db.js";
const User = sequelize.define("users", {
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
    type: DataTypes.STRING,

    allowNull: false,
    required: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(250),
    allowNull: false,
    required: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
  },
}, {
  timestamps: false
});
export default User;