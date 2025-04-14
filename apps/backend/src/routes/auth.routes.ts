import { Router } from "express";
import registerUser from "../controllers/register.controller";
import register_validate from "../middlewares/register_validate.middleware";
import { loginUserController } from "../controllers/login.controller";
import login_validate from "../middlewares/login_validate.middleware";

const router = Router();

router.post("/login", login_validate, loginUserController);
router.post("/register", register_validate, registerUser);

export default router;