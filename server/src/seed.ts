import User from "./schemas/user.schema";
import dotenv from "dotenv";
import { connectToDatabase } from "./db";
import { MqttQos } from "./types/mqtt";
import AppConfig from "./schemas/appConfig.schema";
import Survey from "./schemas/survey.schema";
import Trial from "./schemas/trial.schema";

dotenv.config();

connectToDatabase().then(async () => {
  const user = await User.create({
    username: "admin",
    password: process.env.SEED_PASSWORD,
  });

  const trial = await Trial.create({
    name: "Test Trial",
    description: "Test Description",
  });

  const appConfig = await AppConfig.create({
    trialId: trial._id,
    project: "ReMINDS1",
    subscribeQos: MqttQos.AT_LEAST_ONCE,
    publishQos: MqttQos.AT_LEAST_ONCE,
    brokerDomain: "sapphirewearables.com",
    brokerPort: 8883,
    postCode: "RG54ZW",
    countryCode: "GB",
    username: "NSpitz",
    password: "30011734",
    location: "Test Location",
    clientId: "noella-test",
    p12Password: "Laudy5^Ak%#eVXqNbqLW",
    sslCertificate: "test",
    sslKey: "test",
  });

  const survey = await Survey.create({
    trialId: trial._id,
    title: "Test Survey",
    questions: [
      {
        question: "Did you like this service?",
        options: ["Yes", "No"],
      },
    ],
    videoLink: "test",
  });

  console.log("Seed completed");
});
