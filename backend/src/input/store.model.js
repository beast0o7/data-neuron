const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
    {
        store_number: { type: Number, required: true },
        created_count: { type: Number,default:0 },
        updated_count: { type: Number,default:0 },
    },
    { timestamps: true },
);

const store = mongoose.model('store', storeSchema);

module.exports = store;
