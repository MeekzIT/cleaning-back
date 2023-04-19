var express = require("express");
var router = express.Router();
const imagesController = require("../controllers/images-controller");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.get("/", imagesController.getAll);
router.post("/", authAdminMiddleWare, imagesController.create);
router.post("/edit", authAdminMiddleWare, imagesController.edit);
router.post("/del", authAdminMiddleWare, imagesController.delateItem);

module.exports = router;
