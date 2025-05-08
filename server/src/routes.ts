import { Router } from "express";
import authController from "./controllers/auth.controller";
import configController from "./controllers/config.controller";
import { authMiddleware } from "./auth.middleware";
import trialController from "./controllers/trail.controller";
import deviceController from "./controllers/device.controller";
import surveyController from "./controllers/survey.controller";

const router = Router();

router.post("/login", authController.login);

router.use(authMiddleware);

router.get("/config/:trialId", configController.getConfig);
router.put("/config/:trialId", configController.updateConfig);

router.get("/trials", trialController.getTrials);
router.post("/trials", trialController.createTrial);
router.delete("/trials/:id", trialController.deleteTrial);
router.put("/trials/:id", trialController.updateTrial);

router.get("/devices/:trialId", deviceController.getDevices);
router.post("/devices/:trialId", deviceController.createDevice);
router.delete("/devices/:trialId/:id", deviceController.deleteDevice);
router.put("/devices/:trialId/:id", deviceController.updateDevice);

router.get("/survey/:trialId", surveyController.getSurvey);
router.put("/survey/:trialId", surveyController.updateSurvey);

export default router;
