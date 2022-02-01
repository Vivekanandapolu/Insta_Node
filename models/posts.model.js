import { DataTypes } from "sequelize";
import sequelize from "../uitility/db.js";
import User from "./users.model.js";
const Posts = sequelize.define("posts", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
    // upload: {
    //     required: true,
    //     allowNull: false,
    //     type: DataTypes.BLOB,
    // }
}, {
    timestamps: false
})
// Posts.belongsTo(User, { foreignKey: 'user_id' });
export default Posts;