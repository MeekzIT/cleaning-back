var express = require("express");
var router = express.Router();
const aboutUsController = require("../controllers/aboutUs-controller");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

//admin routes
router.get("/", aboutUsController.getAll);
router.post("/edit", authAdminMiddleWare, aboutUsController.edit);

module.exports = router;
