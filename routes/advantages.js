var express = require("express");
var router = express.Router();
const advantagesController = require("../controllers/advantages-controller");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.get("/", advantagesController.getAll);
router.post("/create", authAdminMiddleWare, advantagesController.create);
router.post("/edit", authAdminMiddleWare, advantagesController.edit);
router.post("/del", authAdminMiddleWare, advantagesController.delateItem);

module.exports = router;
