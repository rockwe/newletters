const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const mailSchema = mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: false },
    phoneNumber: { type: String, default: null },
});

mailSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Mail', mailSchema);
