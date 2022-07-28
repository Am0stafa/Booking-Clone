const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
      name: {
          type: String,
          required: true,
        },
      type: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      distance: {
        type: String,
        required: true,
      },
      photos: {
        type: [String],
      },
      title: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
      rooms: {
        type: [String],//! going to contain room ids child of hotel
      },
      cheapestPrice: {
        type: Number,
        required: true,
      },//! rather than checking each one the admin can update it
      featured: {
        type: Boolean,
        default: false,
      },//! to show featured hotels
});

    const Hotel = mongoose.model('Hotel', hotelSchema);

    module.exports = Hotel