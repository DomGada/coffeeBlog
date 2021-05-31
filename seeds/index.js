const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const CoffeeShop = require('../models/coffeeshops');



mongoose.connect('mongodb://localhost:27017/coffeeShops', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connect error:'));
db.once('open', () => {
    console.log('Database Connected')
});

const seedDB = async () => {
    await CoffeeShop.deleteMany({});
    const shop = new CoffeeShop({
        location: 'Santa Cruz, CA',
        shopN: 'Cat and Cloud',
        website: 'https://catandcloud.com/',
        image: 'https://i.pinimg.com/originals/99/69/6c/99696cdbc3203da7a8cd4e7ff5b3af39.jpg',
        description: 'Cat and Cloud is a Santa Cruz local favorite, boasting a home like atmosphere, fun creative baristas, and some of the best coffee in town.'
    })
    await shop.save();
};
seedDB().then(() => {
    mongoose.connection.close();
});

// const seedDB = async () => {
//     await Campground.deleteMany({})
//     for (let i = 0; i < 50; i++) {
//         const random1000 = Math.floor(Math.random() * 1000)
//         const price = Math.floor(Math.random() * 20) + 10
//         const camp = new Campground({
//             location: `${cities[random1000].city}, ${cities[random1000].state}`,
//             title: `${sample(descriptors)} ${sample(places)}`,
//             image: 'https://source.unsplash.com/collection/483251',
//             description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quae laudantium, necessitatibus est sequi culpa laboriosam deleniti magnam voluptate debitis, commodi consectetur fugiat pariatur consequuntur impedit ad distinctio veritatis temporibus.Asperiores nostrum voluptatum modi, vel repellendus, sed enim mollitia inventore ipsa optio voluptatibus architecto dolorem eius fuga alias rem ducimus distinctio corporis commodi nobis! Reprehenderit adipisci molestiae accusantium ipsum explicabo.',
//             price
//         })
//         await camp.save();
//     }
// }