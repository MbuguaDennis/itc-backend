const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accommodationStatus: { type: String, enum: ['Pending','Approved','Rejected'], default: 'Pending' },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);