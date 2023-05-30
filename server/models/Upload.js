const mongoose = require('mongoose');

const { Schema } = mongoose;

const uploadSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    album: {
        type: String, 
        required: true
    },
    artist: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true, 
        min: 0.99
    },
    description: {
        type: String, 
        required: true
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    }
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;