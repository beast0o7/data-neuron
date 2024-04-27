const response = require('../../utils/response');
const bookService = require('./book.service');

exports.getBook = async (req, res) => {
    const { store_number } = req.query;

    const result = await bookService.fetchBook({ store_number });
    if (!result.error) {
        return response.ok(res, result);
    } else {
        return response.noData(res, result);
    }
}

exports.addBook = async (req, res) => {
    const { title, description, store_number } = req.body;
    const bookData = { title, description, store_number };
    const result = await bookService.insertBook(bookData);
    if (!result.error) {
        return response.created(res, result);
    } else {
        return response.unprocessableEntity(res, result);
    }
}

exports.updateBookById = async (req, res) => {
    const { title } = req.params;
    const {  description, store_number } = req.body;
    const bookData = {  title, description, store_number };
    const result = await bookService.modifyBookById(bookData);
    if (!result.error) {
        return response.ok(res, result);
    } else {
        return response.noData(res, result);
    }
}

