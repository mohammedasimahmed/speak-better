import { Router } from "express";
import registerUserController from "../controllers/register.controller";
import register_validate from "../middlewares/validate/register.middleware";
import loginUserController from "../controllers/login.controller";
import login_validate from "../middlewares/validate/login.middleware";
import refreshController from "../controllers/refresh.controller";

const router = Router();

router.post("/login", login_validate, loginUserController);
router.post("/register", register_validate, registerUserController);
router.get("/refresh", refreshController);

export default router;