import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import { connect, model, Schema } from "mongoose";

if (!process.env.MONGODB_CONNECTION_STRING) {
  throw new Error("Mongodb connection string is not set");
}
// Connect to MongoDB

try {
  await connect(process.env.MONGODB_CONNECTION_STRING);
} catch (err) {
  console.error("Error while connecting to the database", err);
}

// Define schemas
const AdminSchema = new Schema({
  // Schema definition here
  username: {
    type: String,
    unique: true,
  },
  password: String,
});

const UserSchema = new Schema({
  // Schema definition here
  username: {
    type: String,
    unique: true,
  },
  password: String,
  purchasedCourses: [
    {
      type: Schema.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new Schema({
  // Schema definition here
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

const Admin = model("Admin", AdminSchema);
const User = model("User", UserSchema);
const Course = model("Course", CourseSchema);

export { Admin, Course, User };
