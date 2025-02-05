const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOOSE_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`)

  } catch (err) {
    console.log(err);
    process.exit(1)

  }
}

module.exports = connectDB;
