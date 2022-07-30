const Hotel = require('../model/hotelModel')
const Room = require('../model/roomMode')

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
      const { min, max, ...others } = req.query;//! to set mn kam le kam
      
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min ?? 1, $lt: max ?? 999 },
      }).limit(req.query.limit);
      
      res.status(200).json({
            status: 'success',
            data: hotels
        })
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}
exports.getByName=async (req, res, next) => {
    try {
    const cities = req.query.cities.split(",")
    //! we want for each city to get its count
    const list = await Promise.all(cities.map(c => {
        return Hotel.countDocuments({city:c})
        
    }))

      res.status(200).json({
            status: 'success',
            data: list
        })
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}
exports.getByTypes=async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "Hotels" });
        const apartmentCount = await Hotel.countDocuments({ type: "Apartments" });
        const resortCount = await Hotel.countDocuments({ type: "Resorts" });
        const villaCount = await Hotel.countDocuments({ type: "Villas" });
        const cabinCount = await Hotel.countDocuments({ type: "Cabins" });
    
        res.status(200).json([
          { type: "hotel", count: hotelCount },
          { type: "apartments", count: apartmentCount },
          { type: "resorts", count: resortCount },
          { type: "villas", count: villaCount },
          { type: "cabins", count: cabinCount },
        ]);
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}
exports.getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.hotelId);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };

