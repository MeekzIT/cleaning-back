var express = require("express");
var router = express.Router();
const workerController = require("../controllers/workers-controller");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/create", authAdminMiddleWare, workerController.create);
router.post("/del", authAdminMiddleWare, workerController.deleateWorker);
router.post("/edit", authAdminMiddleWare, workerController.editWorker);
router.post(
  "/changeActivity",
  authAdminMiddleWare,
  workerController.activityWorker
);

router.get("/", authAdminMiddleWare, workerController.getAll);
router.get("/single", authAdminMiddleWare, workerController.getSingle);

module.exports = router;
