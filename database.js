const mongoose = require('mongoose');
const db = 'mongodb+srv://Ks:12345@cluster0-36e02.mongodb.net/weather?retryWrites=true&w=majority';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connection error: ', error);
  });

const schema = mongoose.Schema({
  cityName: { type: String },
});

const weatherSchema = mongoose.Schema({
  name:{type:String},
  temp:{type:String},
  speed:{type:String},
  pressure:{type:String},
  temp_max:{type:Number},
  temp_min:{type:String},
  humidity:{type:String},
  all:{type:String},
})

const weather = mongoose.model('weather', weatherSchema , 'weather');
const city = mongoose.model('cities', schema, 'cities');

module.exports.weather = weather;
module.exports.city = city;
