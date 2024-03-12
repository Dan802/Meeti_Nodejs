import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config({path: '.env'})

const db = new Sequelize('meeti', 'postgres', 'post032024', {
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // define: {
    //     timestamps: false
    // },
    logging: false // Logs
})

export default db