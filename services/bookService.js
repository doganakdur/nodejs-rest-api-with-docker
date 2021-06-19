const { ObjectId } = require('mongoose').Types;

const BookDAL = require('../DALs/bookDAL');

/**
 * @returns {Books}
 */
exports.getAllBooks = async () => {
    return BookDAL.getAllBooks();
};

/**
 * @param {String} bookId 
 * @returns null |
 */
exports.deleteBookById = async (bookId) => {
    if (!bookId) return null;

    return BookDAL.delete(ObjectId(bookId));
};

/**
 * 
 * @param {String} bookId 
 * @param {CreateOrUpdateBookDTO} bookUpdateDTO 
 * @returns null | Book
 */
exports.updateBookById = async (bookId, bookUpdateDTO) => {
    if (!bookId || !bookUpdateDTO) return null;

    bookId = ObjectId(bookId);

    /** Check if there is a book with bookUpdateDTO.ISBN but id not equal to bookId */
    const isBookExist = await this.isBookExistByISBN([bookId], bookUpdateDTO.ISBN);
    if (isBookExist) return null;

    return BookDAL.update(bookId, bookUpdateDTO);
};

/**
 * @param {CreateOrUpdateBookDTO} bookCreateDTO 
 * @returns null | Book
 */
exports.createBook = async (bookCreateDTO) => {
    if (!bookCreateDTO) return null;

    const isBookExist = await this.isBookExistByISBN(null, bookCreateDTO.ISBN);
    if (isBookExist) return null;

    return BookDAL.create(bookCreateDTO);
};

/**
 * @param {[ObjectId]} bookIds
 * @param {String} isbn 
 * @returns boolean
 */
exports.isBookExistByISBN = async (bookIds, isbn) => {
    if (!isbn) return null;

    const query = { ISBN: isbn };
    if (bookIds && bookIds.length > 0) {
        query._id = { $nin: bookIds};
    }

    const book = await BookDAL.findByISBN(query);
    return !!book;
};