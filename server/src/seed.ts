import User from "./schemas/user.schema";
import dotenv from "dotenv";
import { connectToDatabase } from "./db";
import Trial from "./schemas/trial.schema";
import { ObjectId } from "mongodb";
import { createDefaults } from "./createDefaults";

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

  await createDefaults(trial._id as ObjectId);

  console.log("Seed completed");
});
