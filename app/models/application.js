const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    appId: { type: mongoose.ObjectId },
    path: { type: String, required: true },
    description: String,
    approved: { type: Boolean, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('applications', schema);
