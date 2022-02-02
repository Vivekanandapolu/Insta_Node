import { DataTypes, Model, Op } from "sequelize";
import PostModel from "./posts.model.js";
export default class UserModel extends Model {
  static init(sequelize) {
    super.init(
      {
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
      },
      {
        sequelize: sequelize,
        modelName: "users",
        timestamps: false,
      }
    );
  }
  //Relations
  static associations() {
    this.hasMany(PostModel);
  }
  //Custom DAO logics
  static async getAllUsers() {
    try {
      return await this.findAll({
        attributes: { exclude: ["password"] },
        order: [["id", "DESC"]],
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  static async createUser(body) {
    try {
      return await this.create(body);
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getUsersBelowAge(age) {
    try {
      return await this.sum("age", {
        where: { age: { [Op.lte]: age } },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
