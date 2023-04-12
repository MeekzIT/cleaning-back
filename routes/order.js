var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order-controller");
const authMiddleWare = require("../middlewares/authMiddleware");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/create", orderController.create);
router.post("/assignee", authAdminMiddleWare, orderController.assigneeToWorker);
router.post("/finish", authAdminMiddleWare, orderController.finishOrder);
router.get("/", authAdminMiddleWare, orderController.getAll);


module.exports = router;
