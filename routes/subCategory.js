var express = require("express");
var router = express.Router();
const subCategoryController = require("../controllers/subCategory-controller");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.get("/single", subCategoryController.getSingle);

module.exports = router;
