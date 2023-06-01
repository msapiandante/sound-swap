const db = require('./connection');
const { User, Upload, Genre} = require('../models');

db.once('open', async () => {
    try {
        await User.deleteMany();
        await Upload.deleteMany();
        await Genre.deleteMany();

        const genres = await Genre.insertMany([
            { name: "Rock" }, //0
            { name: "Alternative" }, //1
            { name: "Pop" }, //2
            { name: "Electronic" }, //3
            { name: "Country" }, //4
            { name: "Hip Hop" }, //5
            { name: "Jazz" }, //6
            { name: "R&B" }, //7
            { name: "Classical "} //8

        ])

        const uploads = Upload.insertMany([
            {
                img: "",
                album: "Back in Black",
                artist: "AC/DC",
                price: 25.00,
                description: "mint condition",
                genre: genres[0]
            },
            {
                img: "",
                album: "Some Girls",
                artist: "The Rolling Stones",
                price: 30.50,
                genre: genres[0]
            },
            {
                img: "",
                album: "Wish You Were Here",
                artist: "Pink Floyd",
                price: 35.00,
                genre: genres[0]
            },
            {
                img: "",
                album: "Biomorph",
                artist: "Enrico Sangiuliano",
                price: 30.00,
                genre: genres[3]
            },
            {
                img: "",
                album: "Butterflies",
                artist: "Boris Brejcha",
                price: 29.99,
                genre: genres[3]
            },
            {
                img: "",
                album: "Parts of Life",
                artist: "Paul Kalkbrenner",
                price: 25.00,
                genre: genres[3]
            },
            {
                img: "",
                album: "Californication",
                artist: "Red Hot Chili Peppers",
                price: 25.50,
                genre: genres[1]
            },
            {
                img: "",
                album: "Audioslave",
                artist: "Audioslave",
                price: 20.00,
                genre: genres[1]
            },
            {
                img: "",
                album: "Younger Now",
                artist: "Miley Cyrus",
                price: 30.00,
                genre: genres[2]
            },
            {
                img: "",
                album: "Fine Line",
                artist: "Harry Styles",
                price: 30.00,
                genre: genres[2]
            },
            {
                img: "",
                album: "Uncaged",
                artist: "Zac Brown Band",
                price: 25.00,
                genre: genres[4]
            },
            {
                img: "",
                album: "Purgatory",
                artist: "Tyler Childers",
                price: 30.00,
                genre: genres[4]
            },
            {
                img: "",
                album: "i am > i was",
                artist: "21 Savage",
                price: 40.00,
                genre: genres[5]
            },
            {
                img: "",
                album: "Nothing Was The Same",
                artist: "Drake",
                price: 100.00,
                genre: genres[5]
            },
            {
                img: "",
                album: "Painting Pictures",
                artist: "Kodak Black",
                price: 599.99,
                genre: genres[5]
            },
            {
                img: "",
                album: "Kind of Blue",
                artist: "Miles Davis",
                price: 60.00,
                genre: genres[6]
            },
            {
                img: "",
                album: "What a Wonderful World",
                artist: "Louis Armstrong",
                price: 75.00,
                genre: genres[6]
            },
            {
                img: "",
                album: "Ctrl",
                artist: "SZA",
                price: 40.00,
                genre: genres[7]
            },
            {
                img: "",
                album: "Late Nights",
                artist: "Jeremih",
                price: 10.00,
                genre: genres[7]
            },
            {
                img: "",
                album: "The Four Seasons",
                artist: "Antonio Vivaldi",
                price: 69.00,
                genre: genres[8]
            },
            {
                img: "",
                album: "Una Mattina",
                artist: "Ludovico Einaudi",
                price: 46.90,
                genre: genres[8]
            },
            {
                img: "",
                album: "ANTI",
                artist: "Rihanna",
                price: 2.00,
                genre: genres[7]
            },
        ])

        await User.insertMany([
            { 
                firstName: "Derek", 
                lastName: "Shepherd", 
                email: "derek@gmail.com", 
                password: "Nachonacho123",
                uploads: [
                    uploads[0]._id,
                    uploads[1]._id,
                    uploads[2]._id,
                    uploads[3]._id,
                    uploads[4]._id,
                    uploads[5]._id,
                    uploads[6]._id,
                    uploads[7]._id,
                    uploads[8]._id,
                    uploads[9]._id,
                    uploads[10]._id,

                ],
                orders: [
                    {
                        uploads: [uploads[16]._id, uploads[21]._id]
                    }
                ] 
            },
            { 
                firstName: "Izzie", 
                lastName: "Stevens", 
                email: "izzie@gmail.com", 
                password: "Nachonacho123",
                uploads: [
                    uploads[11]._id,
                    uploads[12]._id,
                    uploads[13]._id,
                    uploads[14]._id,
                    uploads[15]._id,
                    uploads[16]._id,
                    uploads[17]._id,
                    uploads[18]._id,
                    uploads[19]._id,
                    uploads[20]._id,
                    uploads[21]._id,

                ],
                orders: [
                    {
                        uploads: [uploads[6]._id, uploads[2]._id]
                    }
                ]   
            },
        ])


        process.exit()

    } catch (err) {
        console.log(err)
    }

})
