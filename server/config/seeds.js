const db = require("./connection");
const { User, Upload, Genre, Order} = require("../models");

db.once("open", async () => {
  try {
    await User.deleteMany();
    await Upload.deleteMany();
    await Genre.deleteMany();
    await Order.deleteMany();

    const genres = await Genre.insertMany([
      { name: "Rock" }, //0
      { name: "Alternative" }, //1
      { name: "Pop" }, //2
      { name: "Electronic" }, //3
      { name: "Country" }, //4
      { name: "Hip Hop" }, //5
      { name: "Jazz" }, //6
      { name: "R&B" }, //7
      { name: "Classical " }, //8
    ]);

    const uploads = await Upload.insertMany([
      {
        img: "BackInBlack.jpeg",
        album: "Back in Black",
        artist: "AC/DC",
        price: 25.0,
        description: "mint condition",
        genre: genres[0],
      },
      {
        img: "SomeGirls.jpeg",
        album: "Some Girls",
        artist: "The Rolling Stones",
        price: 30.5,
        description: "mint condition",
        genre: genres[0],
      },
      {
        img: "WishYouWereHere.jpeg",
        album: "Wish You Were Here",
        artist: "Pink Floyd",
        price: 35.0,
        description: "mint condition",
        genre: genres[0],
      },
      {
        img: "Biomorph.jpeg",
        album: "Biomorph",
        artist: "Enrico Sangiuliano",
        price: 30.0,
        description: "mint condition",
        genre: genres[3],
      },
      {
        img: "Butterflies.jpeg",
        album: "Butterflies",
        artist: "Boris Brejcha",
        price: 29.99,
        description: "mint condition",
        genre: genres[3],
      },
      {
        img: "PartsOfLife.jpeg",
        album: "Parts of Life",
        artist: "Paul Kalkbrenner",
        price: 25.0,
        description: "mint condition",
        genre: genres[3],
      },
      {
        img: "Californication.jpeg",
        album: "Californication",
        artist: "Red Hot Chili Peppers",
        price: 25.5,
        description: "mint condition",
        genre: genres[1],
      },
      {
        img: "AudioSlave.jpeg",
        album: "Audioslave",
        artist: "Audioslave",
        price: 20.0,
        description: "mint condition",
        genre: genres[1],
      },
      {
        img: "YoungerNow.jpeg",
        album: "Younger Now",
        artist: "Miley Cyrus",
        price: 30.0,
        description: "mint condition",
        genre: genres[2],
      },
      {
        img: "FineLine.jpeg",
        album: "Fine Line",
        artist: "Harry Styles",
        price: 30.0,
        description: "mint condition",
        genre: genres[2],
      },
      {
        img: "Uncaged.jpeg",
        album: "Uncaged",
        artist: "Zac Brown Band",
        price: 25.0,
        description: "mint condition",
        genre: genres[4],
      },
      {
        img: "Purgatory.jpeg",
        album: "Purgatory",
        artist: "Tyler Childers",
        price: 30.0,
        description: "mint condition",
        genre: genres[4],
      },
      {
        img: "iam>iwas.jpeg",
        album: "i am > i was",
        artist: "21 Savage",
        price: 40.0,
        description: "mint condition",
        genre: genres[5],
      },
      {
        img: "NothingWasTheSame.jpeg",
        album: "Nothing Was The Same",
        artist: "Drake",
        price: 100.0,
        description: "mint condition",
        genre: genres[5],
      },
      {
        img: "PaintingPictures.jpeg",
        album: "Painting Pictures",
        artist: "Kodak Black",
        price: 599.99,
        description: "mint condition",
        genre: genres[5],
      },
      {
        img: "KindOfBlue.jpeg",
        album: "Kind of Blue",
        artist: "Miles Davis",
        price: 60.0,
        description: "mint condition",
        genre: genres[6],
      },
      {
        img: "WhatAWonderfulWorld.jpeg",
        album: "What a Wonderful World",
        artist: "Louis Armstrong",
        price: 75.0,
        description: "mint condition",
        genre: genres[6],
      },
      {
        img: "Ctrl.jpeg",
        album: "Ctrl",
        artist: "SZA",
        price: 40.0,
        description: "mint condition",
        genre: genres[7],
      },
      {
        img: "LateNights.jpeg",
        album: "Late Nights",
        artist: "Jeremih",
        price: 10.0,
        description: "mint condition",
        genre: genres[7],
      },
      {
        img: "TheFourSeasons.jpeg",
        album: "The Four Seasons",
        artist: "Antonio Vivaldi",
        price: 69.0,
        description: "mint condition",
        genre: genres[8],
      },
      {
        img: "UnaMattina.jpeg",
        album: "Una Mattina",
        artist: "Ludovico Einaudi",
        price: 46.9,
        description: "mint condition",
        genre: genres[8],
      },
      {
        img: "ANTI.jpeg",
        album: "ANTI",
        artist: "Rihanna",
        price: 2.0,
        description: "mint condition",
        genre: genres[7],
      },
    ]);

    const order = await Order.create({
        uploads: [uploads[6]._id, uploads[2]._id]
    })


    console.log(uploads);
    await User.create({
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
      orders: [uploads[16]._id, uploads[21]._id],
    });

    await User.create({
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
      orders: order,
    });

    process.exit();
  } catch (err) {
    console.log(err);
  }
});
