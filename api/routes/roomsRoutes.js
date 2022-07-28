const express = require('express');
const roomController = require('../controller/roomsController')
const router = express.Router();
const verifyToken = require('../utils/verifyToken')

        //! add verify admin
router
    //CREATE
    .post('/:hotelId',verifyToken.verifyToken,roomController.createRoom)
    //UPDATE
    .patch('/:id',verifyToken.verifyToken,roomController.update)
    //DELETE
    .delete('/:id/:hotelId',verifyToken.verifyToken,roomController.deleteRoom)
    //GET 
    .get('/:id',roomController.getOnRoom)
    //GET ALL
    .get('/',roomController.getAllRooms)


module.exports = router;