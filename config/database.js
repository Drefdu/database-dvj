const mongoose = require("mongoose");


//DB_MONGO = 'mongodb://localhost:27017/estacionamientoDVJ'
DB_MONGO = 'mongodb+srv://daniela:danielaruiz@cluster1.8zhrttp.mongodb.net/estacionamientoDVJ?retryWrites=true&w=majority'

const connectDb = async () => {
  try {
    await mongoose.connect(DB_MONGO);
    console.log("base de datos conectada");
  } catch (error) {
    console.log(error);
    console.log("BackEnd detenido");
    process.exit(1);
  }
};

module.exports = connectDb;
