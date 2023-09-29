import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
const bcrypt = require('bcrypt');
dotenv.config();

const host  = process.env.host;
const databaseName = process.env.databaseName;
const useName = process.env.useNAme||'root';
const password = process.env.password;
const databasePort = process.env.databasePort;

function createModels() {
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
    userId:{
      type:DataTypes.INTEGER,
      allowNull:true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  const User=sequelize.define('user',{
    id:{
      type:DataTypes.INTEGER,
      unique:true,
      primaryKey:true,
      allowNull:false,
      autoIncrement:true
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
    }
    ,
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      set(password) {
        // Hash the password before setting it
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        this.setDataValue('password', hashedPassword);
      }
    },
    },{
      timestamps:false,
      freezeTableName:true
    }
    )

 User.hasMany(Book)
 Book.belongsTo(User) 

  sequelize.sync({ alter: true })
    .then(() => {
      console.log('Tables created');
    })
    .catch((error) => {
      console.error(error);
    });

  return {'book':Book,'user':User};
}



module.exports = createModels;
