const mongoose = require('mongoose');
const RoomModel = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      desc: {
        type: String,
        required: true
      },
      maxPeople: {
        type: Number,
        required: true,
      },
      roomNumbers: [{number:Number,unavailableDates:[Date]}]
      //! we can have multiple rooms like this one with all the same thing but the difference is the room numbers and we have unavailableDates so that no one can book the same room in the same date
    }  );
  const Room = mongoose.model('Room', RoomModel);

  module.exports = Room   