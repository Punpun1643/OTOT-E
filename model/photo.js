const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create photo schema & model
const PhotoSchema = new Schema({
    albumId: {
        type: Number,
    },
    id: {
        type: Number,
    },
    title: {
        type: String,
    },
    url: {
        type: String,
    },
    thumbnailUrl: {
        type: String
    }
});


const Photo = mongoose.model('photo', PhotoSchema);

module.exports = Photo;