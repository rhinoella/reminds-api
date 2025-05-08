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
  pharmacyLocation?: string;
  status: DeviceStatus;
  sslCertificate: string;
  sslKey: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeviceCreate {
  trialId: string;
  deviceId: string;
  deviceType: DeviceType;
  pharmacyLocation: string;
  sslCertificate: string;
  sslKey: string;
}

export interface DeviceDocument extends Device, Document {}
