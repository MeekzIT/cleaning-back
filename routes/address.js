var express = require("express");
var router = express.Router();
const addressController = require("../controllers/addres-controller");
const authMiddleWare = require("../middlewares/authMiddleware");

router.post("/create", authMiddleWare, addressController.create);
router.post("/edit", authMiddleWare, addressController.editAddres);
router.post("/del", authMiddleWare, addressController.delateAddres);

module.exports = router;
