const db = require('./connection');

const { User, Upload, Genre } = require('../models');

db.once('open', async () => {
    try {
        await User.deleteMany();
        await Upload.deleteMany();
        await Genre.deleteMany();

        const genres = await Genre.insertMany([
            { name: "Rock" },
            { name: "Techno" },
            { name: "Alternative" },
            { name: "Pop" },
            { name: "Electronic" },
            { name: "Country" },
            { name: "House" },
            { name: "Hip Hop" },
            { name: "Jazz" },
            { name: "R&B" }

        ])

        await User.insertMany([
            { firstName: "Sarah", lastName: "Baker", email: "sarah@gmail.com", password: "Nachonacho123" },
            { firstName: "Clay", lastName: "Evans", email: "clay@gmail.com", password: "Nachonacho123" },
            { firstName: "Derek", lastName: "Shepherd", email: "derek@gmail.com", password: "Nachonacho123" },
            { firstName: "Izzie", lastName: "Stevens", email: "izzie@gmail.com", password: "Nachonacho123" },
            { firstName: "Nate", lastName: "Scott", email: "nate@gmail.com", password: "Nachonacho123" },

        ])

        await Upload.insertMany([
            { img: "url", album: "Bloom", artist: "Rüfus du Sol", price: 15.00, description: "mint condition", genre: genres[4] },
            { img: "url", album: "Audioslave", artist: "Audioslave", price: 15.00, description: "mint condition", genre: genres[0] },
            { img: "url", album: "Wish You Were Here", artist: "Pink Floyd", price: 15.00, description: "mint condition", genre: genres[0] },
            { img: "url", album: "Starting Over", artist: "Chris Stapleton", price: 15.00, description: "mint condition", genre: genres[5] },
            { img: "url", album: "Doggystyle", artist: "Snoop Dogg", price: 15.00, description: "mint condition", genre: genres[7] }
        ])

        process.exit()

    } catch (err) {
        console.log(err)
    }


})

