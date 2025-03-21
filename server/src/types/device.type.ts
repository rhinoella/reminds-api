import { Document, ObjectId } from "mongoose";

export enum DeviceType {
  ANDROID = "android",
  IOS = "ios",
}

export enum DeviceStatus {
  ACTIVE = "active",
  BLOCKED = "blocked",
}

export interface Device {
  trialId: ObjectId;
  deviceId: string;
  deviceType: DeviceType;
  status: DeviceStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeviceDocument extends Device, Document {}
