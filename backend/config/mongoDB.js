const mongoose = require('mongoose');
const config = require('config');

const mongoose_URI = config.get('MongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoose_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Data base connected...`);
  } catch (error) {
    console.log('Error in connecting DataBase..' + error);
  }
};

module.exports = connectDB;
