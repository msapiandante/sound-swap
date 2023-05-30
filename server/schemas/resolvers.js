const { AuthenticationError } = require("apollo-server-express");
const { User, Upload, Genre, Order, WishList } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(
  "sk_test_51NDWu1BPxAL3HDjsQQ3kXJEnJ0p9TqMP00mB3u1doMGDCxbMupRTJhbfiAHSTCLi4E9t7XtCbPdHSpaM4by6We1800P4e2ARKt"
);

//add a user, update a user, add an order, add upload to wishlist, delete form wishlist
//add upload, delete upload, find genre, delete user
const resolvers = {
    Query: {
        genre: async () => {
            return await Genre.find();
        },
        uploads: async (parent, {genre, album}) => {
            const params = {};
            if(genre) {
                params.genre = genre;
            }
            if(album) {
                params.album = {
                    $regex: album
                };
            }
            return await Upload.find(params).populate('genre');
        },
        upload: async (parent, {_id}) => {
            return await Upload.findById(_id).populate('genre');
        },
        user: async(parent, args, context) => {
            if(context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.uploads',
                    populate: 'genre'
                });
                return user.orders.id(_id);
            }
            throw new AuthenticationError('Oops! You need to log in!');
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({uploads: args.uploads});
            const line_items = [];

            const {uploads} = await order.populate('uploads');

            for (let i = 0; i < uploads.length; i++) {
                const upload = await stripe.uploads.create({
                    album: uploads[i].album,
                    description: uploads[i].description,
                    imgs: [`${url}/imgs/${uploads[i].img}`]
                });

                const price = await stripe.prieces.create({
                    upload: upload.id,
                    unit_amount: uploads[i].price * 100,
                    currency: 'usd',
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });

                
            }
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}`
            })
        }
    }
}