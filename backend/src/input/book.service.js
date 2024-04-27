const { db } = require('../../models')
const { pagination } = require('../../pagination');

exports.fetchBook = async (query) => {

  const { store_number } = query;


  // const result = await db.store.findOne({ store_number });
  const result = await db.store.findOneAndUpdate(
    { store_number: store_number },{store_number},
    { upsert: true, new: true } // Create if doesn't exist, and return updated document
  );


  if (result) {
    return { error: null, message: "Data Found", data: result }
  } else {
    return { error: true, message: "Data Not Found", data: result }
  }
}

exports.insertBook = async (bookData) => {
  const { title, description, store_number } = bookData;

  const bookExistsInStore = await db.book.findOne({ title, store_number });

  if (bookExistsInStore) {
    return { error: true, message: "Book Already Exists In Store Please Update The Book!", data: null };
  };

  const result = await db.book.create({ title, description, store_number });
  const updatedStore = await db.store.findOneAndUpdate(
    { store_number: store_number },
    { $inc: { created_count: 1 } }, // Increment created_count by 1
    { upsert: true, new: true } // Create if doesn't exist, and return updated document
  );



  if (result) {
    return { error: null, message: "Data Inserted", data: { result, updatedStore } };
  } else {
    return { error: true, message: "Error while inserting data", data: null };
  }
}

exports.modifyBookById = async (bookData) => {
  const { title, description, store_number } = bookData;
  const book = await db.book.findOne({ title, store_number });

  if (!book) {
    return { error: true, message: "Book Not Found" };
  };

  book.description = description;
  book.save()

  const updatedStore = await db.store.findOneAndUpdate(
    { store_number: store_number },
    { $inc: { updated_count: 1 } }, // Increment updated_count by 1
    { upsert: true, new: true } // Create if doesn't exist, and return updated document
  );

  return { error: null, data: book, message: "Book Details Updated!" };

}


exports.deleteBookById = async (id) => {
  const result = await db.book.deleteOne({ _id: id })
  if (result) {
    return { error: null, data: result, message: "Book Deleted" };
  } else {
    return { error: true, data: result, message: "Book Not found" };
  }
}

