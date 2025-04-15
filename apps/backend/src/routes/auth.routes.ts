import { Router } from "express";
import registerUser from "../controllers/register.controller";
import register_validate from "../middlewares/validate/register.validate.middleware";
import { loginUserController } from "../controllers/login.controller";
import login_validate from "../middlewares/validate/login.validate.middleware";

const router = Router();

router.post("/login", login_validate, loginUserController);
router.post("/register", register_validate, registerUser);

export default router;