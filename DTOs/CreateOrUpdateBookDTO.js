const { ObjectId } = require('mongoose').Types;

const Languages = require('../enums/languages');

class CreateOrUpdateBookDTO {
    constructor(book) {
        this.Title = book.title;
        this.Price = book.price;
        this.ISBN = book.isbn;
        this.Language = book.language ? Languages[book.language] : null;
        this.NumberOfPages = book.numberOfPages;
        this.Publisher = book.publisher;
    }
}

module.exports = CreateOrUpdateBookDTO;