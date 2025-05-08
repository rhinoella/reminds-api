import Device from "../schemas/device.schema";
import { Request, Response } from "express";
import { DeviceCreate, DeviceStatus } from "../types/device.type";
import Trial from "../schemas/trial.schema";
import { ObjectId } from "mongodb";

async function getDevices(req: Request, res: Response) {
  const devices = await Device.find();
  res.json(devices);
}

async function createDevice(req: Request, res: Response) {
  try {
    const deviceCreate = req.body as DeviceCreate;

    const device = await Device.create({
      deviceId: deviceCreate.deviceId,
      deviceType: deviceCreate.deviceType,
      pharmacyLocation: deviceCreate.pharmacyLocation,
      status: DeviceStatus.ACTIVE,
      sslCertificate: deviceCreate.sslCertificate,
      sslKey: deviceCreate.sslKey,
    });

    res.json(device);
    return;
  } catch (error) {
    console.error("Error creating device:", error);
    res.status(500).json({ message: "Failed to create device" });
    return;
  }
}

async function deleteDevice(req: Request, res: Response) {
  const device = await Device.findOneAndDelete({
    _id: new ObjectId(req.params.id),
  });
  if (!device) {
    res.status(404).json({ message: "Device not found" });
    return;
  }
  res.json(device);
}

async function updateDevice(req: Request, res: Response) {
  const updateRequest = req.body;

  const device = await Device.findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    {
      status: updateRequest.status,
      sslCertificate: updateRequest.sslCertificate,
      sslKey: updateRequest.sslKey,
    },
    { new: true }
  );

  res.json(device);
}

export default {
  getDevices,
  createDevice,
  deleteDevice,
  updateDevice,
};
