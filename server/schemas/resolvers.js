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
        order: async (parent, {_id}, context) => {
            if(context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.uploads',
                    populate: 'genre'
                });
                return await user.orders.id(_id)
            }
            throw new AuthenticationError('Oops! You need to log in!')
        },
        user: async(parent, args, context) => {
            if(context.user) {
                const user = await User.findById(context.user._id).populate(
                    {
                    path: 'wishlist.uploads',
                    populate: 'genre'
                    },
                    {
                        path: 'uploads',
                        populate: 'genre'
                    }
                    //put order here? or keep under order
                );
                return user.wishlist.id(_id) && user.uploads.id(_id);
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
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });
            return {session: session.id}
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        updateUser: async (parent, args, context) => {
            if(context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, {new: true});
            }
            throw new AuthenticationError('Oops! You need to log in!')
        },
        addOrder: async (parent, {uploads}, context) => {
            console.log(context);
            if(context.user) {
                const order = new Order({uploads});
                await User.findByIdAndUpdate(context.user._id, {$push: {uploads: upload }});

                return order;
            }
            throw new AuthenticationError('Oops! You need to log in!');
        },
        deleteOrder: async (parent, {orderId}, context) => {
            console.log(context);
            if(context.user) {
                const order = await Order.findOneAndDelete({
                    _id: orderId,
                });
                await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {orders: order._id}}
                );
                return order;
            }
            throw new AuthenticationError('Oops! You need to log in!')
        },
        addUpload: async (parent, args, context) => {
            if(context.user) {
                const upload = await Upload.create(args);
                await User.findOneAndUpdate( 
                    {_id: context.user._id},
                    {$push: {uploads: upload._id}}
                );

                return upload;
            };
            throw new AuthenticationError('Oops! You need to log in!')
        },
        updateUpload: async (parent, args, context) => {
            if(context.user) {
                const upload = await Upload
            }
            
        },
        deleteUpload: async () => {

        },
        addWishList: async() => {

        },
        deleteWishlist: async() => {

        }
    }
}