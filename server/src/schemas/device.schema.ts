import { DeviceDocument, DeviceStatus, DeviceType } from "../types/device.type";
import { model, Schema } from "mongoose";

const deviceSchema = new Schema<DeviceDocument>({
  trialId: { type: Schema.Types.ObjectId, ref: "Trial", required: true },
  deviceId: { type: String, required: true },
  deviceType: { type: String, enum: DeviceType, required: true },
  status: { type: String, enum: DeviceStatus, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<DeviceDocument>("Device", deviceSchema);
