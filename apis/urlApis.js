import express from "express";
import { body } from "express-validator";

// Import isAuthenticated Middleware
import { isAuthenticated } from "../middlewares/isAuth.js";
// Import ErrorHandler Utility Middleware
import { errorHandler } from "../utils/errorHandler.js";

// Import Controllers
import generateURLController from "../controllers/url/generateURLController.js";
import fetchURLController from "../controllers/url/fetchURLController.js";
import deleteURLController from "../controllers/url/deleteURLController.js";
import updateURLController from "../controllers/url/updateURLController.js";

const router = express.Router();

router.post(
  "/generate",
  [
    body("url").isURL().withMessage("Invalid URL"),
    body("slug")
      .optional()
      .isLength(6)
      .withMessage("Only 6 Characters slug can be provided"),
  ],
  errorHandler,
  isAuthenticated,
  generateURLController
);

router.post(
  "/fetch",
  [body("shorturl").isURL().withMessage("Invalid URL")],
  errorHandler,
  fetchURLController
);

router.delete(
  "/delete",
  [body("shorturl").isURL().withMessage("Invalid URL")],
  errorHandler,
  isAuthenticated,
  deleteURLController
);
router.post(
  "/update",
  [body("originalUrl").isURL().withMessage("Invalid URL")],
  [body("updatedOriginalUrl").isURL().withMessage("Invalid URL")],
  errorHandler,
  isAuthenticated,
  updateURLController
);

export default router;
