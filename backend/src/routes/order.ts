import express from "express";
const router = express.Router();
import {
  addOrder,
  sendOrderData,
  getSubOrderData,
  addSubOrder,
  updateOrderDetails,
  updateSubOrderList,
  cancelOrder,
} from "../controllers/orderController";
import { authenticateToken } from "../middleware/authentication";
import { checkUserAdminOrSchoolAdmin } from "../middleware/userPermission";

router.post("/create-order", addOrder, sendOrderData, updateOrderDetails);
router.post(
  "/create-suborder",
  authenticateToken,
  addSubOrder,
  updateSubOrderList
);
router.get("/getsuborders", authenticateToken, getSubOrderData, sendOrderData);
router.put("/cancel-order", authenticateToken, cancelOrder);

module.exports = router;
