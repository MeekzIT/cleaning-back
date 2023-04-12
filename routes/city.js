var express = require("express");
var router = express.Router();
const cityController = require("../controllers/city-controller");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.get("/", cityController.getAll);
router.post("/create", authAdminMiddleWare, cityController.create);
router.post("/edit", authAdminMiddleWare, cityController.editCity);
router.post("/del", authAdminMiddleWare, cityController.delateCity);

module.exports = router;
