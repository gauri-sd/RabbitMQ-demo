const mongoose = require('mongoose');

// const url='mongodb://localhost:27017/Task3'
// mongoose.connect(url);

const Schema = mongoose.Schema;

const CitySchema = new Schema({
    name: {type: String, required: true, max: 100}
});

// Export the model
module.exports = mongoose.model('City', CitySchema,'City');