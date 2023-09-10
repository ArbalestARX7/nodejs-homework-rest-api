const express = require("express");
const { validateBody, authenticate, upload } = require("../../mіddlewares");
const { registerSchema, loginSchema } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const { emailSchema } = require("../../models/contacts");

const router = express.Router();

router.post("/register", validateBody(registerSchema), ctrl.register);

router.get("/verify/:verificationCode", ctrl.verifyEmail);

router.post("/verify", validateBody(emailSchema), ctrl.resendVerifyEmail);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
