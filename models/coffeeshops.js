const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const CoffeeshopSchema = new Schema({
    shopN: String,
    image: String,
    website: String,
    description: String,
    location: String,
});


module.exports = mongoose.model('shop', CoffeeshopSchema);