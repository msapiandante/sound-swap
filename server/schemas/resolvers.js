const { AuthenticationError } = require("apollo-server-express");
const { User, Upload, Genre, Order} = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(
  "sk_test_51NDWu1BPxAL3HDjsQQ3kXJEnJ0p9TqMP00mB3u1doMGDCxbMupRTJhbfiAHSTCLi4E9t7XtCbPdHSpaM4by6We1800P4e2ARKt"
);

const resolvers = {
  Query: {
    genre: async () => {
      return await Genre.find();
    },
   
    uploads: async (parent, { genre, album }) => {
      const params = {};
      if (genre) {
        params.genre = genre;
      }
      if (album) {
        params.album = {
          $regex: album,
        };
      }
      return await Upload.find(params).populate("genre");
    },
    upload: async (parent, { _id }) => {
      return await Upload.findById(_id).populate('genre');
    },
    //issues with the user.orders.id is not a function
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.uploads',
          populate: 'genre',
        });
        return user.orders.id(_id);
      }
      throw new AuthenticationError("Oops! You need to log in!");
    },
    //orders returning as an empty array, uploads are working though
    user: async (parent, args, context) => {
      if (context.user) {
        
      const user = await User.findById(context.user._id).populate('uploads').populate('orders').populate({path: 'orders', populate: 'uploads'})
        console.log(user)
      return user;
    }

      throw new AuthenticationError("Oops! You need to log in!");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ uploads: args.uploads });
      const line_items = [];

      const { uploads } = await order.populate("uploads");

      for (let i = 0; i < uploads.length; i++) {
        const upload = await stripe.products.create({
          album: uploads[i].album,
          description: uploads[i].description,
          imgs: [`${url}/images/${uploads[i].img}`],
        });

        const price = await stripe.prices.create({
          upload: upload.id,
          unit_amount: uploads[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      return { session: session.id };
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Something went wrong! Try again!');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Something went wrong! Try again');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
    //returning null
    addOrder: async (parent, { uploads }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ uploads });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }
      throw new AuthenticationError("Oops! You need to log in!");
    },
    //genre returning null
    addUpload: async (parent, args, context) => {
      if (context.user) {
        const upload = await Upload.create(args);

        await User.findOneAndUpdate(
          { id: context.user._id},
          { $push: { uploads: upload } }
        );

        return upload;
      }
      throw new AuthenticationError("Oops! You need to log in!");
    },
    //changed params for now.... we will see how this plays out
    updateUpload: async (parent, args, context) => {
  if (context.user) {
       const upload = await Upload.findOneAndUpdate({_id: args.id}, args, { new: true });

       return upload;
      }
      throw new AuthenticationError("Oops! You need to be logged in!");
    },

    deleteUpload: async (parent, { uploadId }, context) => {
      if (context.user) {
        const upload = await Upload.findOneAndDelete({
          _id: uploadId,
        });
        return await User.findOneAndUpdate(
          { id: context.user._id },
          { $pull: { uploads: upload } }
        );
     }
      throw new AuthenticationError("Oops! You need to be logged in!");
    },
  },
};

module.exports = resolvers;
