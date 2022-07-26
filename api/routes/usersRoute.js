const express = require('express');
const userController = require('../controller/userController')
const verifyToken = require('../utils/verifyToken')

const router = express.Router();
    router
        .patch('/:id',verifyToken.verifyToken,verifyToken.verifyUser,userController.update)
        .delete('/:id',verifyToken.verifyToken,verifyToken.verifyUser,userController.deleteUser)
        .get('/:id',verifyToken.verifyToken,verifyToken.verifyUser,userController.getOnUser)
        .get('/',verifyToken.verifyToken,verifyToken.verifyAdmin,userController.getAllUsers)


module.exports = router;