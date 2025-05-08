import { Router } from "express";
import authController from "./controllers/auth.controller";
import configController from "./controllers/config.controller";
import { authMiddleware } from "./auth.middleware";
import deviceController from "./controllers/device.controller";
import surveyController from "./controllers/survey.controller";
import surveySubmissionController from "./controllers/survey-submission.controller";

const router = Router();

router.post("/login", authController.login);

router.use(authMiddleware);

router.get("/config", configController.getConfig);
router.put("/config", configController.updateConfig);

router.get("/devices", deviceController.getDevices);
router.post("/devices", deviceController.createDevice);
router.delete("/devices/:id", deviceController.deleteDevice);
router.put("/devices/:id", deviceController.updateDevice);

router.get("/survey", surveyController.getSurvey);
router.put("/survey", surveyController.updateSurvey);

// Survey submission routes
router.post("/survey-submissions", surveySubmissionController.submitSurvey);
router.get("/survey-submissions", surveySubmissionController.getSubmissions);

export default router;
