const express = require('express');

const router = express.Router();
const bookController = require('./book.controller');
const { errorWrapper } = require('../../utils/error');
const { handleValidation } = require('../../middleware/handleValidation');
const { validateBody, validateUpdateBody, validateQuery } = require('./book.validation');

router.get('/store/count', validateQuery, handleValidation,errorWrapper(bookController.getBook));
router.post('/', validateBody, handleValidation, errorWrapper(bookController.addBook));
router.put('/:title', validateUpdateBody, handleValidation, errorWrapper(bookController.updateBookById));

module.exports = router;
