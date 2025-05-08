import { DeviceDocument, DeviceStatus, DeviceType } from "../types/device.type";
import { model, Schema } from "mongoose";

const deviceSchema = new Schema<DeviceDocument>({
  deviceId: { type: String, required: true, unique: true },
  deviceType: { type: String, enum: DeviceType, required: true },
  status: { type: String, enum: DeviceStatus, required: true },
  pharmacyLocation: { type: String, required: false },
  sslCertificate: { type: String, required: true },
  sslKey: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<DeviceDocument>("Device", deviceSchema);
