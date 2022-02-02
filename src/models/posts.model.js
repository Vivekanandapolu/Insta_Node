import { DataTypes, Model } from "sequelize";
import UserModel from "./users.model.js";
export default class PostModel extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        title: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
      },
      {
        sequelize: sequelize,
        timestamps: false,
        modelName: "posts",
      }
    );
  }
  static associations() {
    this.belongsTo(UserModel, { foreignKey: "user_id" });
  }
}
