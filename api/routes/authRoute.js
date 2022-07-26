const express = require('express');
const authController = require('../controller/authController')

const router = express.Router();
router
    .post("/register",authController.signUp)
    .post("/login",authController.signIn)


module.exports = router;