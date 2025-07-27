import { Router } from "express";
import { signup, login, logout } from "./auth.controller.js";
const router = Router();

router.post("/signup", signup);
router.post("/signup", login);
router.post("/signup", logout);
