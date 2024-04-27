const mongoose = require('mongoose');
const { mongoSync } = require('../models');

function DatabaseConnect() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    mongoSync();
    console.log('Mongo DB Connected');
  }).catch((err) => {
    console.log(`Error While Connecting Database\n${err}\nRetry Database Connection after 5000ms\n`);
    setTimeout(() => {
      DatabaseConnect();
    }, 5000);
  });
}

DatabaseConnect();

