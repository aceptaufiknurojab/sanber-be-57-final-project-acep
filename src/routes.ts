import express from "express";

import uploadMiddleware from "./middlewares/upload.middleware";
import uploadController from "./controllers/upload.controller";
import productsController from "./controllers/products.controller";
import categoryController from "./controllers/category.controller";
import authController from "./controllers/auth.controller";
import { authMiddleware } from "./middlewares/auth.midlleware";
import aclMiddleware from "./middlewares/acl.midlleware";
import { createOrder, getOrderHistory } from '@/controllers/order.controller';

const router = express.Router();

router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

router.get("/categories", categoryController.findAll);
router.post("/categories", categoryController.create);
router.get("/categories/:id", categoryController.findOne);
router.put("/categories/:id", categoryController.update);
router.delete("/categories/:id", categoryController.delete);

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/auth/me", [authMiddleware, aclMiddleware(["admin"])], authController.me); // Modified route
router.put("/auth/profile", authMiddleware, authController.profile);

router.post("/upload", uploadMiddleware.single, uploadController.single);
router.post("/uploads", uploadMiddleware.multiple, uploadController.multiple);

router.post('/orders', authMiddleware, createOrder);
router.get('/orders', authMiddleware, getOrderHistory);

export default router;
