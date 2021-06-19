const validator = require('express-validator');
const HTTP_STATUS = require('http-status');

/**
 * Checks result of the running validators for endpoints and return response immediately or runs router.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns res | next
 */
module.exports = (req, res, next) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
        const response = {
            success: false,
            data: null,
            message: errors.array()[0].msg
        }

        return res.status(HTTP_STATUS.BAD_REQUEST).json(response);
    }

    return next();
};