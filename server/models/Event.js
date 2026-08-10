const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");


const Event = sequelize.define("Event",{

name:{
type:DataTypes.STRING,
allowNull:false
},

description:{
type:DataTypes.TEXT,
allowNull:false
},

date:{
type:DataTypes.STRING,
allowNull:false
},

time:{
type:DataTypes.STRING,
allowNull:false
},

location:{
type:DataTypes.STRING,
allowNull:false
}

});


module.exports=Event;