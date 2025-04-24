const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});

module.exports = mongoose.model('Category', categorySchema);
