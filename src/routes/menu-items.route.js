import express from "express";
import { createNewMenu, createNewMenuItem, deleteItem, deleteMenu, getFullMenu, updateItem, updateMenu } from "../controllers/menu-items.controller.js";
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route("/create-new-menu").post(createNewMenu);
router.route("/create-new-item").post(createNewMenuItem);
router.route("/update-menu/:menuId/:itemId").put(updateMenu);
router.route("/update-item/:menuId/:itemId").put(updateItem);
router.route("/delete-item/:menuId/:itemId").delete(deleteItem);
router.route("/delete-menu/:menuId").delete(deleteMenu);
router.route("/getList").get(authenticateToken, getFullMenu);

export default router;