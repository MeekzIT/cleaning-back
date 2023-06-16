var express = require("express");
var router = express.Router();
const subCategoryController = require("../controllers/subCategory-controller");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.get("/single", subCategoryController.getSingle);
router.post(
  "/edit",
  authAdminMiddleWare,
  subCategoryController.editSubCategory
);
router.post("/del", authAdminMiddleWare, subCategoryController.delateCategory);
router.post("/", authAdminMiddleWare, subCategoryController.create);
router.get("/", subCategoryController.getAll);

module.exports = router;
