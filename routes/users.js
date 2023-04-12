var express = require("express");
var router = express.Router();
const userController = require("../controllers/user-controller");
const authMiddleWare = require("../middlewares/authMiddleware");

router.post("/create", userController.create);
router.post("/login", userController.login);
router.post("/logout", authMiddleWare, userController.logout);
router.post("/edit", authMiddleWare, userController.editAccount);
router.post("/changeAvatar", authMiddleWare, userController.changeAvatar);

router.get("/", userController.getAll);
module.exports = router;
