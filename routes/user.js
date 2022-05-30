const express = require("express");

const router = express.Router();

// routes-endpoints  - BAD PRACTICE
router.get("/user", (req, res, next) => {
  res.json({
    data: "Hey you hit user API endpoint",
  });
});

// GOOD-PRACTICE (principios de responsabilidad e inyección de dependencias)
// router.post("/product", authCheck, adminCheck, validateCreateProduct, create);
module.exports = router;
