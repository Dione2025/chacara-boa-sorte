const mongoose = require('mongoose');

const billSessionSchema = new mongoose.Schema({
  config: {
    month: String,
    year: Number,
    totalBillAmount: Number,
    totalKwhMaster: Number,
    kwhPrice: Number,
    streetKwh: Number,
    wellKwh: Number,
    kwhSurplus: Number,
    maintenanceFee: Number,
    extraFees: [{ description: String, amount: Number }]
  },
  readings: [{
    residentId: String,
    lot: String,
    name: String,
    previousReading: Number,
    currentReading: Number,
    consumption: Number,
    energyCost: Number,
    streetFee: Number,
    wellFee: Number,
    kwhSurplusCharge: Number,
    maintenanceFee: Number,
    extraFeesTotal: Number,
    total: Number,
    paid: { type: Boolean, default: false },
    paymentType: { type: String, enum: ['PIX', 'Dinheiro', 'Transferência', 'Outro', null], default: null },
    paymentDate: { type: String, default: null }
  }],
  status: { type: String, enum: ['active', 'closed'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('BillSession', billSessionSchema);
