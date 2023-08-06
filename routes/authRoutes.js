const express = require("express");
const { registerController } = require("../controllers/authControllers.js");


const router = express.Router();

//routes
router.post("/register", registerController);

module.exports = router;

