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
    .get('/:id',hotelsController.getOnHotel)
    //GET ALL
    .get('/',hotelsController.getAllHotels)







module.exports = router;