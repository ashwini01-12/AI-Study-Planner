const express = require("express");
const jwt = require("jsonwebtoken");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const passport = require("../config/passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        userId: req.user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.redirect(
      `${process.env.CLIENT_URL}/auth/google/success?token=${token}`
    );
  },
);

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, getMe);

module.exports = router;
