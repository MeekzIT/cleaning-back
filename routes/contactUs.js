var express = require("express");
var router = express.Router();
const contactsUsController = require("../controllers/contactUs-controller");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/", contactsUsController.create);
router.get(
  "/",
  authAdminMiddleWare,
  contactsUsController.getAll
);
router.post(
  "/sendAnswer",
  authAdminMiddleWare,
  contactsUsController.sendAnswer
);
router.post("/delete", authAdminMiddleWare, contactsUsController.deleteItem);

module.exports = router;
