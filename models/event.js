const mongoose = require ("mongoose");

const eventSchema = new mongoose.Schema({
    title: {type: "string", required: true, minlength: 2, maxlength:30},
    detail: {type: "string", required: true, minlength:2, maxlength:500},
},
{timestamps: true});

const Event = mongoose.model('event',eventSchema);

mongoose.exports = Event;

