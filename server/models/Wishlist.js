const mongoose = require('mongoose');

const { Schema } = mongoose;

const wishlistSchema = new Schema( {
    dateAdded: {
        type: Date,
        default: Date.now
    },
    uploads: {
        type: Schema.Types.ObjectId,
        ref: 'Upload',
        required: true
    }    
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
