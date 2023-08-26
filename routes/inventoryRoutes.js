const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes for inventory

router.post("/create-inventory", authMiddleware, createInventoryController);

//get the blood records
router.get("/get-inventory", authMiddleware, getInventoryController);

//get the hospital blood records
router.post("/get-inventory-hospital", authMiddleware, getInventoryHospitalController);

//get the donar records
router.get("/get-donars", authMiddleware, getDonarsController);

//get the hospital records
router.get("/get-hospitals", authMiddleware, getHospitalController);

//get the organisation records
router.get("/get-organisation", authMiddleware, getOrganisationController);

//get the hospital records
router.get("/get-organisation-for-hospital", authMiddleware, getOrganisationForHospitalController);

module.exports = router;
