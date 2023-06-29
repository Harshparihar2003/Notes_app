const mongoose = require("mongoose")

// Connection URL
const url = 'mongodb+srv://pariharharsh337:inotebook@cluster0.orb48py.mongodb.net/?retryWrites=true&w=majority';
// const url = 'mongodb+srv://pariharharsh337:harshsingh@cluster0.dpmkvbw.mongodb.net/';

const main = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
    console.log("connected to mongoose successfully")
  } catch (error) {
    console.error(error);
  }
}
module.exports = main;
