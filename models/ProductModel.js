import {Sequelize} from 'sequelize';
import db from '../config/Database.js';
import Users from './UserModel.js';

const {DataTypes} = Sequelize;

const Products = db.define('products',{
    uuid :{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allownull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    name:{
        type: DataTypes.STRING,
        allownull:false,
        validate:{
            notEmpty: true,
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allownull:false,
        validate:{
            notEmpty: true,
        }
    },
    userId :{
        type: DataTypes.INTEGER,
        allownull: false,
        validate:{
            notEmpty: true,
        }
    }
},{
    freezeTableName : true
});

Users.hasMany(Products);
Products.belongsTo(Users, {foreignKey: 'userId'});
export default Products;