import User from "./schemas/user.schema";
import dotenv from "dotenv";
import { connectToDatabase } from "./db";
import Trial from "./schemas/trial.schema";
import { ObjectId } from "mongodb";
import { createDefaults } from "./createDefaults";

dotenv.config();

async function seed() {
  try {
    await connectToDatabase();

    // Check if admin user exists
    let user = await User.findOne({ username: "admin" });
    if (!user) {
      user = await User.create({
        username: "admin",
        password: process.env.SEED_PASSWORD,
      });
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }

    // Check if test trial exists
    let trial = await Trial.findOne({ name: "Test Trial" });
    if (!trial) {
      trial = await Trial.create({
        name: "Test Trial",
        description: "Test Description",
      });
      console.log("Test trial created");

      await createDefaults(trial._id as ObjectId);
      console.log("Default data created for trial");
    } else {
      console.log("Test trial already exists");
    }

    console.log("Seed completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
