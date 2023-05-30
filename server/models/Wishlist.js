const mongoose = require('mongoose');

const { Schema } = mongoose;

const wishlistSchema = new Schema( {
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    dateAdded: {
        type: Schema.Types.ObjectId,
        ref: 'Date Added',
        required: true
    }
});

module.exports = Wishlist;
