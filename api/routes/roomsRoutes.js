const express = require('express');
const roomController = require('../controller/roomsController')
const router = express.Router();
const verifyToken = require('../utils/verifyToken')

        
router
    //CREATE
    .post('/:hotelId',verifyToken.verifyToken,roomController.createRoom)
    //UPDATE
    .patch('/:id',verifyToken.verifyToken,roomController.update)
    .patch('/availability/:id',verifyToken.verifyToken,roomController.updateAvailability)
    //DELETE
    .delete('/:id/:hotelId',verifyToken.verifyToken,roomController.deleteRoom)
    //GET 
    .get('/:id',roomController.getOnRoom)
    //GET ALL
    .get('/',roomController.getAllRooms)


module.exports = router;