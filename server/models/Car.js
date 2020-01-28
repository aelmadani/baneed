const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  make: { type: String, required: true },
  model: { type: String, required: true },
  trim: { type: String, required: false },
  mileage: { type: Number, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  autoGear: { type: Boolean, default: false },
  aircon: { type: Boolean, default: false },
  parkCam: { type: Boolean, default: false },
  description: { type: String, required: false },
  imageLinks: { type: Array, required: false },
  dateCreated: { type: Date, default: Date.now }
});

module.exports = Car = mongoose.model("cars", CarSchema);
