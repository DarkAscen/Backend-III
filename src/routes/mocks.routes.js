import { Router } from "express";
import { mockManager } from "../managers/MockManager.js";

const router = Router();

router.get("/")
router.get("/mocks/users/:n", mockManager.createMockUsers);
router.get("/mocks/products/:n", mockManager.createMockProducts);

export default router;