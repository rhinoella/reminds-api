import AppConfig from "../schemas/appConfig.schema";
import { Request, Response } from "express";
import Device from "../schemas/device.schema";

async function getConfig(req: Request, res: Response) {
  const deviceId = req.query.deviceId as string;
  const config = await AppConfig.findOne();

  const device = await Device.findOne({ deviceId });

  res.json({
    ...config,
    ...device,
  });
}

async function updateConfig(req: Request, res: Response) {
  const config = await AppConfig.findOneAndUpdate(req.body, { new: true });
  res.json(config);
}

export default { getConfig, updateConfig };
