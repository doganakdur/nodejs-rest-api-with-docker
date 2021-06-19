const express     = require('express');
const router      = express.Router();

/** SERVICES */
const { getAllBooks, deleteBookById, updateBookById, createBook } = require('../services/bookService');

/** Data Transfer Objects */
const CreateOrUpdateBookDTO = require('../DTOs/CreateOrUpdateBookDTO');

/** MIDDLEWARES */
const requestValidator = require('../middlewares/requestValidator');
const { createOrUpdateBookBodyValidator, bookIdValidatorForUrl } = require('../middlewares/validators/bookValidators');

/** CONSTANTS */
const Messages = require('../constants/messages');

/** MAPPERS */
const ResponseMapper = require('../mappers/responseMapper');

/** UTILS */
const { getFetchedMessage, getCreatedMessage, getUpdatedMessage, getDeletedMessage } = require('../utils/messageGenerator');

router.post('/',
    createOrUpdateBookBodyValidator,
    requestValidator,
    async (req, res, next) => {
        let response = ResponseMapper(null, false, Messages.GENERAL_ERROR);

        try {
            const bookCreateDTO = new CreateOrUpdateBookDTO(req.body);
            const book = await createBook(bookCreateDTO);

            if (!book) {
                response = ResponseMapper(null, false, 'Please check request data. Some data is missing or ISBN already exists for another book!');
            } else {
                response = ResponseMapper(book, true, getCreatedMessage('Book'));
            }

        } catch (err) {
            console.log(err);
        }

        return res.json(response);
    }
);

router.get('/',
    async (req, res, next) => {
        let response = ResponseMapper(null, false, Messages.GENERAL_ERROR);

        try {
            const books = await getAllBooks();
            response = ResponseMapper(books, true, getFetchedMessage('Books'));
        } catch (err) {
            console.log(err);
        }

        return res.json(response);
    }
);

router.delete('/:id',
    bookIdValidatorForUrl,
    requestValidator,
    async (req, res, next) => {
        let response = ResponseMapper(null, false, Messages.GENERAL_ERROR);

        try {
            const bookId = req.params.id;
            const deleteResult = await deleteBookById(bookId);
            if (deleteResult && deleteResult.deletedCount === 1) {
                response = ResponseMapper(null, true, getDeletedMessage('Book'));
            } else {
                response = ResponseMapper(null, true, 'Book could not be found to be deleted.');
            }
        } catch (err) {
            console.log(err);
        }

        return res.json(response);
    }
);

router.put('/:id',
    bookIdValidatorForUrl,
    createOrUpdateBookBodyValidator,
    requestValidator,
    async (req, res, next) => {
        let response = ResponseMapper(null, false, Messages.GENERAL_ERROR);

        try {
            const bookId = req.params.id;
            const bookUpdateDTO = new CreateOrUpdateBookDTO(req.body);
            const book = await updateBookById(bookId, bookUpdateDTO);

            if (!book) {
                response = ResponseMapper(null, false, 'Please check request data. Some data is missing or ISBN already exists for another book!');
            } else {
                response = ResponseMapper(book, true, getUpdatedMessage('Book'));
            }
        } catch (err) {
            console.log(err);
        }

        return res.json(response);
    }
);

module.exports = router;