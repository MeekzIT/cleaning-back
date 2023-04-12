var express = require("express");
var router = express.Router();
const adminController = require("../controllers/admin-controller");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/login", adminController.login);
router.post("/logout", authAdminMiddleWare, adminController.logout);
router.post(
  "/changeSettings",
  authAdminMiddleWare,
  adminController.changeSettings
);

module.exports = router;
