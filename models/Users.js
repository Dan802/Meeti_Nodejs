import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: DataTypes.STRING(60),
    image: DataTypes.STRING(60),
    email: {
        type: DataTypes.STRING(30),
        allowNull: false, 
        validate: {
            isEmail: {msg: 'Add a valid email'}
        },
        unique: {
            args: true,
            msg: 'The user already exists'
        }
    },password: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'The password can not be empty'
            }
        }
    },
    active: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tokenPassword: DataTypes.STRING,
    expiraToken: DataTypes.DATE
}, {
    hooks: {
        beforeCreate: async function(user) {
            const salt = await bcrypt.genSalt(10) // > 10 stronger
            user.password = await bcrypt.hash(user.password, salt)
        }
    }
})

// Method to compare the passwords
Users.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

export default Users