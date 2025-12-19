const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
  lot: { type: String, required: true, trim: true },
  oldLot: { type: String, default: '' },
  name: { type: String, required: true, trim: true },
  lastReading: { type: Number, default: 0 },
  exemptWellFee: { type: Boolean, default: false },
  exemptStreetFee: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Resident', residentSchema);