const Hotel = require('../model/hotelModel')

exports.createHotel=async (req, res, next) => {
    try {
        const newHotel = await Hotel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
              data: newHotel
            }})
            
            
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}
exports.update = async (req, res, next) => {
    try {
       const update = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        //so when updating it will follow our data validation that is set in our schema
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
exports.deleteHotel =async (req, res, next) => {
    try {
       await Hotel.findByIdAndDelete(req.params.id)
      res.status(200).json({
            status: 'success',
            data: "hotel deleted"
        })
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}

exports.getOnHotel=async (req, res, next) => {
    try {
      const hotels = await Hotel.findById(req.params.id)
      res.status(200).json({
            status: 'success',
            data: hotels
        })
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}

exports.getAllHotels=async (req, res, next) => {
    try {
      const hotels = await Hotel.find()
      res.status(200).json({
            status: 'success',
            data: hotels
        })
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}
//62ddaee77648496ac15e5212