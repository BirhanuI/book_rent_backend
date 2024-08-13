const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/auth");
const {upload_book} = require('../controllers/booksController')
const { auth, isOwner, isAdmin } = require("../middlewares/authMiddleware");

router.post("/login", login);
router.post("/signup", signup);

router.get("/owner", auth, isOwner, (req, res) => {
  res.json({
    success: true,
    message: "You are a valid Student",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "You are a valid Admin",
  });
});

router.get("/create-book", upload_book);

router.get("/upload-book", upload_book);

module.exports = router;
