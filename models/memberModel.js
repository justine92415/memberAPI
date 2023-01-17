const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
    {
        cName: {
            type: String,
            required: [true, 'A member must have a cName'],
            unique: true,
            trim: true,
        },
        eName: {
            type: String,
            required: [true, 'A member must have a eName'],
            unique: true,
            trim: true,
        },
        sex: {
            type: Number,
            required: [true, 'A member must have a sex'],
        },
        phone: {
            type: String,
            required: [true, 'A member must have a phone'],
        },
        mail: {
            type: String,
            required: [true, 'A member must have a mail'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
