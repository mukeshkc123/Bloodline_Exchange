const express = require("express");
const { registerController, loginController, currentUserController } = require("../controllers/authControllers.js");
const authMiddleware = require("../middlewares/authMiddleware.js");


const router = express.Router();

//routes

//Register POST
router.post("/register", registerController);

//Login Post
router.post("/login",loginController)
module.exports = router;

//getting the current User
router.get("/current-user",authMiddleware,currentUserController)

