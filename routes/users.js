var express = require("express");
var router = express.Router();
const userController = require("../controllers/user-controller");
const authMiddleWare = require("../middlewares/authMiddleware");
const adminAuthMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/create", userController.create);
router.post("/login", userController.login);
router.post("/logout", authMiddleWare, userController.logout);
router.post("/edit", authMiddleWare, userController.editAccount);
router.post("/changeAvatar", authMiddleWare, userController.changeAvatar);
router.post("/changePassword", authMiddleWare, userController.changePassword);

router.get("/", userController.getAll);
router.get("/single", authMiddleWare, userController.getSingle);
router.get("/history", adminAuthMiddleWare, userController.getUserHistory);
router.post("/del", adminAuthMiddleWare, userController.delateAccount);

module.exports = router;
