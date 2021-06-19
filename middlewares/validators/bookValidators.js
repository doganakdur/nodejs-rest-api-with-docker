const validator = require('express-validator');

const { getFieldExistMessage, getFieldTypeMessage } = require('../../utils/messageGenerator');

/**
 * Validates body of POST and PUT book endpoints.
 */
exports.createOrUpdateBookBodyValidator = [
    validator.body('title')
        .exists()
        .withMessage(getFieldExistMessage('title'))
        .isString()
        .withMessage(getFieldTypeMessage('title', 'string')),
    validator.body('price')
        .exists()
        .withMessage(getFieldExistMessage('price'))
        .isNumeric()
        .withMessage(getFieldTypeMessage('price', 'number')),
    validator.body('isbn')
        .exists()
        .withMessage(getFieldExistMessage('isbn'))
        .isString()
        .withMessage(getFieldTypeMessage('isbn', 'string')),
];

/**
 * Validates id parameter in url for DELETE and PUT book endpoints.
 */
exports.bookIdValidatorForUrl = [
    validator.param('id')
        .exists()
        .withMessage('Book id should exist in url!!')
        .isString()
        .withMessage('Book id should be string!!'),
];