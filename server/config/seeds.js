const db = require('./connection');
const { User, Upload, Genre } = require('../models');

db.once('open', async () => {
    try {
        await User.deleteMany();
        await Upload.deleteMany();

        const users = await User.insertMany([
            { firstName: "Elva", lastName: "Rothman", email: "elva@gmail.com", password: "Nachonacho123" },

        ])

        const uploads = await Upload.insertMany([
            { img: "url", album: "Bloom", artist: "Rüfus du Sol", price: 15.00, description: "mint condition" }
        ])

        process.exit()

    } catch (err) {
        console.log(err)
    }

})