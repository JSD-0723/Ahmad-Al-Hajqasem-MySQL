import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const host  = process.env.host;
const databaseName = process.env.databaseName;
const useName = process.env.useNAme||'root';
const password = process.env.password;
const databasePort = process.env.databasePort;

function createBookModel() {
  const sequelize = new Sequelize({
    password:password,
    database:databaseName,
    username:useName,
    host,
    port: parseInt(databasePort!),
    dialect: 'mysql',
  });

  const Book = sequelize.define('book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: 'Null',
    },
    AuthorName: {
      type: DataTypes.STRING,
      defaultValue: 'Null',
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  Book.sync({ alter: true })
    .then(() => {
      console.log('Table created');
    })
    .catch((error) => {
      console.error(error);
    });

  return Book;
}

module.exports = createBookModel;
