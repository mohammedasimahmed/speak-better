import { Router } from "express";
import { addCredentialsController, checkCredentialsController, removeCredentialsController } from "../controllers/bloom.controllers";

const router = Router();

router.post("/check-credentials", checkCredentialsController);
router.post("/add-credentials", addCredentialsController);
router.post("/remove-credentials", removeCredentialsController);

export default router;
