const mongoose = require("mongoose");

// Principio solid: responsability

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CLOUD, {
      useNewUrlParser: true,
      useUnifiedTopology: true, //models, querys, definition fields, etc...
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("DB CONNECTED");
  } catch (err) {
    console.log("DB CONNECTION ERROR", err);
    process.exit(1);
  }
};

module.exports = connectDB;
