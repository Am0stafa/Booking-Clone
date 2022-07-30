const Hotel = require('../model/hotelModel');
const Room = require('../model/roomMode')
const createError = require('../utils/error')


//! after creating a room we want to added the room id inside room array in hotels

exports.createRoom=async (req, res, next) => {
    try {
        const newRoom = await Room.create(req.body);
        
        const hotelId = req.params.hotelId
        await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:newRoom._id}})
        
        
        res.status(201).json({
            status: 'success',
            data: {
              data: newRoom
            }})
            
            
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}

exports.update = async (req, res, next) => {
    try {
       const update = await Room.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      })
      res.status(200).json({
        status: 'success',
        data: {
          data: update
        }})
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}
exports.updateAvailability = async (req, res, next) => {
    try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
}
exports.deleteRoom =async (req, res, next) => {
    try {
       await Room.findByIdAndDelete(req.params.id)
       
       const hotelId = req.params.hotelId
       await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
       
       
       res.status(200).json({
            status: 'success',
            data: "Room deleted"
        })
        
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}

exports.getOnRoom=async (req, res, next) => {
    try {
      const Rooms = await Room.findById(req.params.id)
      res.status(200).json({
            status: 'success',
            data: Rooms
        })
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}

exports.getAllRooms=async (req, res, next) => {
    try {
      const Rooms = await Room.find()
      res.status(200).json({
            status: 'success',
            data: Rooms
        })
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}