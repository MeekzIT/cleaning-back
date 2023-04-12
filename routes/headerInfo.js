var express = require("express");
var router = express.Router();
const headerInfoController = require("../controllers/headerInfo-controller");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.get("/", headerInfoController.getAll);
router.post("/edit", authAdminMiddleWare, headerInfoController.edit);

module.exports = router;
