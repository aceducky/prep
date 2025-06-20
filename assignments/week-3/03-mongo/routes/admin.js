import { Router } from "express";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";
import { Admin, Course } from "../db/index.js";
import { z } from "zod/v4";
import reqBodyValidator from "../middleware/reqBodyValidator.js";
import jwt from "jsonwebtoken";

const router = Router();

// Admin Routes
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
    // Implement admin signup logic
    Admin.create(req.body)
      .then(() => {
        const jwtToken = jwt.sign(
          {
            username: req.body.username,
          },
          process.env.JWT_SECRET
        );
        res.status(200).json({
          message: "Admin created successfully",
          token: jwtToken,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(400).json({
            error: "User already exists",
          });
        }
        console.error(err);
        res.status(500).json({ message: "Error creating admin" });
      });
  }
);

router.post(
  "/courses",
  adminAuthMiddleware,
  reqBodyValidator(
    z
      .object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        imageLink: z.url().optional(),
        price: z.number().nonoptional(),
      })
      .strip()
  ),
  (req, res) => {
    // Implement course creation logic
    Course.create(req.body)
      .then((newCourse) => {
        res.status(200).json({
          message: "Course created successfully",
          courseId: newCourse._id,
        });
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).json({ message: "Error creating course" });
      });
  }
);

router.get("/courses", adminAuthMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  Course.find()
    .then((courses) => {
      res.status(200).json({ courses });
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500).json({ message: "Error getting course list" });
    });
});

export default router;
