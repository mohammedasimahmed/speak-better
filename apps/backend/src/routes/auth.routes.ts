import { Router } from "express";
import registerUserController from "../controllers/register.controller";
import register_validate from "../middlewares/validate/register.middleware";
import loginUserController from "../controllers/login.controller";
import login_validate from "../middlewares/validate/login.middleware";
import refreshController from "../controllers/refresh.controller";
import logoutController from "../controllers/logout.controller";

const router = Router();

router.post("/login", login_validate, loginUserController);
router.post("/register", register_validate, registerUserController);
router.get("/refresh", refreshController);
router.get("/logout", logoutController);

export default router;