import { Document, ObjectId } from "mongoose";

export interface AppConfig {
  trialId: ObjectId;
  videoLink: string;
  project: string;
  subscribeQos: number;
  publishQos: number;
  brokerDomain: string;
  brokerPort: number;
  postCode: string;
  countryCode: string;
  username: string;
  password: string;
  location: string;
  clientId: string;
  p12Password: string;
  sslCertificate: string;
  sslKey: string;
}

export interface AppConfigDocument extends AppConfig, Document {}
