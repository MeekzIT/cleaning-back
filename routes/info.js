var express = require("express");
var router = express.Router();
const infoController = require("../controllers/info-controller");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.get("/", infoController.getAll);
router.post("/edit", authAdminMiddleWare, infoController.edit);

module.exports = router;
