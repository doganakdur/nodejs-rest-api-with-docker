/**
 * Data Access Layer for Book Model
 * 
 * File is responsible for CRUD operations
 */

 const Book = require('../models/book');
 
 exports.create = async (bookCreateDTO) => {
    try {
        const book = new Book(bookCreateDTO);
        return book.save();
    } catch (err) {
        console.log(err);

        return null;
    }
 };
 
 exports.update = async (bookId, bookUpdateDTO) => {
    try {
        return Book.findOneAndUpdate({ _id: bookId }, { $set: bookUpdateDTO }, { new: true });
    } catch (err) {
        console.log(err);

        return null;
    }
 };
 
 exports.delete = async (bookId) => {
    try {
        return Book.deleteOne({ _id: bookId });
    } catch (err) {
        console.log(err);

        return null;
    }
 };
 
 exports.getAllBooks = async () => {
    try {
        return Book.find({}).sort({ updatedAt: -1 }).lean();
    } catch (err) {
        console.log(err);

        return null;
    }
 };
 
 /**
  * @param {Object} query : { _id?: ObjectId, ISBN: string}
  */
 exports.findByISBN = async (query) => {
    try {
        return Book.findOne(query).lean();
    } catch (err) {
        console.log(err);

        return null;
    }
 };