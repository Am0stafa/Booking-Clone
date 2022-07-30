const express = require('express');
const router = express.Router();
const hotelsController = require('../controller/hotelsController')

router
    //CREATE
    .post('/',hotelsController.createHotel)
    //UPDATE
    .patch('/:id',hotelsController.update)
    //DELETE
    .delete('/:id',hotelsController.deleteHotel)
    //GET 
    .get('/find/:id',hotelsController.getOnHotel)
    //GET ALL
    .get('/',hotelsController.getAllHotels)
    .get('/countByCityName',hotelsController.getByName)
    .get('/countByCityTypes',hotelsController.getByTypes)
    .get('/room/:hotelId',hotelsController.getHotelRooms)







module.exports = router;