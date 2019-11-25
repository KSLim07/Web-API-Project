const mongoose = require('mongoose');

const schema = mongoose.Schema({
  cityName: { type: String },
});



const city = mongoose.model('cities', schema, 'cities');

module.exports.city = city;
