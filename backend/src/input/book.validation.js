const { body,param, query } = require('express-validator');

exports.validateQuery = [
    query('store_number').exists().withMessage("Store number is Required!").isNumeric().withMessage("Store number must me a number!"),
]

exports.validateBody = [
    body('title').exists().notEmpty().withMessage("Title is Required!"),
    body('description').exists().notEmpty().withMessage("Description is Required!"),
    body('store_number').exists().withMessage("Store number is Required!").isNumeric().withMessage("Store number must me a number!"),
]

exports.validateUpdateBody = [
    param('title').exists().notEmpty().withMessage("Title is Required!"),
    body('description').exists().notEmpty().withMessage("Description is Required!"),
    body('store_number').exists().withMessage("Store number is Required!").isNumeric().withMessage("Store number must me a number!"),
]