import Sequelize from "sequelize";

const sequelizeInstance = new Sequelize("postgres", "postgres", "newPassword", {
  host: "localhost",
  dialect: "postgres",
  omitNull: true,
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 1000,
  },
  logging: false,
});

export default sequelizeInstance;
