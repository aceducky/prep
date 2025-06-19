import { Router } from "express";
import userMiddleware from "../middleware/user.js";
import reqBodyValidator from "../middleware/reqBodyValidator.js";
import { Course, User } from "../db/index.js";
import { z } from "zod/v4";
import { Types } from "mongoose";
const router = Router();

// User Routes
router.post(
  "/signup",
  reqBodyValidator(
    z
      .object({
        username: z.string().nonempty(),
        password: z.string().nonempty(),
      })
      .strip()
  ),
  (req, res) => {
    // Implement user signup logic
    User.create(req.body)
      .then(() => {
        res.status(200).json({ message: "User created successfully" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Error creating user" });
      });
  }
);

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
  Course.find()
    .then((courses) => {
      res.status(200).json({ courses });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ error: "Error listing courses" });
    });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  try {
    if (
      !Types.ObjectId.isValid(courseId) ||
      !(await Course.exists({ _id: courseId }))
    ) {
      return res.status(404).json({ error: "Course does not exist" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error getting course information" });
  }
  const username = req.headers.username;
  User.updateOne({ username }, { $addToSet: { purchasedCourses: courseId } })
    .then(() =>
      res.status(200).json({ message: "Purchased course successfully" })
    )
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ error: "Error purchasing the course" });
    });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  User.findOne({ username }, { purchasedCourses: 1 })
    .then((purchasedCourses) => {
      res.status(200).json({ courses: purchasedCourses });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error listing purchased courses" });
    });
});

export default router;
