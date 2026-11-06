
require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("./models/Event");

const sampleEvents = [
  {
    name: "Coding Contest",
    category: "Technical",
    fee: 100,
    seats: 50,
    date: new Date("2026-12-10")
  },
  {
    name: "Web Development Workshop",
    category: "Workshop",
    fee: 300,
    seats: 60,
    date: new Date("2026-12-10")
  },
  {
    name: "Robotics Challenge",
    category: "Technical",
    fee: 700,
    seats: 25,
    date: new Date("2026-12-11")
  },
  {
    name: "Cultural Night",
    category: "Cultural",
    fee: 0,
    seats: 200,
    date: new Date("2026-12-11")
  },
  {
    name: "Football Tournament",
    category: "Sports",
    fee: 150,
    seats: 80,
    date: new Date("2026-12-12")
  }
];

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    await mongoose.connect(process.env.MONGO_URI);

    for (const event of sampleEvents) {
      await Event.updateOne(
        { name: event.name },
        { $set: event },
        { upsert: true }
      );
    }

    console.log("Five sample events seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
