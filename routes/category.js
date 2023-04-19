var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/ category-controller");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.get("/", categoryController.getAll);
router.get("/single", categoryController.getSingle);
router.post("/create", authAdminMiddleWare, categoryController.create);
router.post("/edit", authAdminMiddleWare, categoryController.editCategory);
router.post("/del", authAdminMiddleWare, categoryController.delateCategory);

module.exports = router;
