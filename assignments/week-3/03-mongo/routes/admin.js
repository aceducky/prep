import { Router } from "express";
import adminMiddleware from "../middleware/admin.js";
import { Admin, Course } from "../db/index.js";
import { z } from "zod/v4";
import reqBodyValidator from "../middleware/reqBodyValidator.js";

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
    Admin.create({ username, password })
      .then(() => {
        res.status(201).json({ message: "Admin created successfully" });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ message: "Error creating admin" });
      });
  }
);

router.post(
  "/courses",
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
  adminMiddleware,
  (req, res) => {
    // Implement course creation logic
    Course.create(req.body)
      .then((newCourse) => {
        res
          .status(201)
          .json({
            message: "Course created successfully",
            courseId: newCourse._id,
          });
      })
      .catch((err) => {
        res.status(500).json({ message: "Error creating course" });
      });
  }
);

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
});

export default router;
