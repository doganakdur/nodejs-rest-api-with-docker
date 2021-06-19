const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const Languages       = require('../enums/languages');
const LanguagesValues = Object.values(Languages);

const BookSchema = new Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Price: {
            type: Number,
            required: true,
        },
        ISBN: {
            type: String,
            required: true,
            unique: true,
        },
        Language: {
            type: String,
            enum: LanguagesValues,
        },
        NumberOfPages: {
            type: Number,
        },
        Publisher: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Book', BookSchema);