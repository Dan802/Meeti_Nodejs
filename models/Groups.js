import UUID from "sequelize";
import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Groups = db.define('groups', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'The group should have a name'
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'The description can not be empty'
            }
        }
    },
    url: DataTypes.TEXT,
    image: DataTypes.TEXT
})

export default Groups
