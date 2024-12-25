import { Router } from "express";
import { register, login, getAllUsers, change } from "../controllers/AuthController.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/change", change);
router.get("/get-contacts", getAllUsers);
export default router;
