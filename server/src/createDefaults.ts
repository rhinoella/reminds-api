import AppConfig from "./schemas/appConfig.schema";
import Survey from "./schemas/survey.schema";
import { ObjectId } from "mongodb";
import { MqttQos } from "./types/mqtt";

export async function createDefaults(trialId: ObjectId) {
  const appConfig = await AppConfig.create({
    trialId: trialId,
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
  });

  const survey = await Survey.create({
    trialId: trialId,
    title: "Test Survey",
    questions: [
      {
        question: "Did you like this service?",
        options: ["Yes", "No"],
      },
    ],
    videoLink: "test",
  });
}
