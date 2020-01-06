const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  carId: String,
  price: Number,
  year: Number,
  color: String,
  mileage: Number,
  autoGear: { type: Boolean, default: false }
});

module.exports = Car = mongoose.model("cars", CarSchema);
