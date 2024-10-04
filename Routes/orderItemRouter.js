import { Router } from "express"; 
import { createOrderItem, deleteOrderItemById } from "../Controllers/orderItemController.js";

const router = Router();

router.post('/add', createOrderItem)

router.delete('/:id/deleteOrderItem', deleteOrderItemById)

export default router; 