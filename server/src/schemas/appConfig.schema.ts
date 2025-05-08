import { AppConfigDocument } from "../types/appConfig.type";
import { model, Schema } from "mongoose";

const appConfigSchema = new Schema<AppConfigDocument>({
  trialId: { type: Schema.Types.ObjectId, ref: "Trial", required: true },
  project: { type: String, required: true },
  subscribeQos: { type: Number, required: true },
  publishQos: { type: Number, required: true },
  brokerDomain: { type: String, required: true },
  brokerPort: { type: Number, required: true },
  postCode: { type: String, required: true },
  countryCode: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  clientId: { type: String, required: true },
  p12Password: { type: String, required: true },
});

export default model<AppConfigDocument>("AppConfig", appConfigSchema);
