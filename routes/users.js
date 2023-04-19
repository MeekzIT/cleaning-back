var express = require("express");
var router = express.Router();
const userController = require("../controllers/user-controller");
const authMiddleWare = require("../middlewares/authMiddleware");

router.post("/create", userController.create);
router.post("/login", userController.login);
router.post("/logout", authMiddleWare, userController.logout);
router.post("/edit", authMiddleWare, userController.editAccount);
router.post("/changeAvatar", authMiddleWare, userController.changeAvatar);
router.post("/changePassword", authMiddleWare, userController.changePassword);

router.get("/", userController.getAll);
router.get("/single", authMiddleWare, userController.getSingle);

module.exports = router;
