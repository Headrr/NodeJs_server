const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const { create, listOrigin, read, update, removeSoft, originCount} = require("./../controllers/recipeOrigin");

// Endpoints

router.post("/origin", authCheck, adminCheck, create);
router.get("/origin", listOrigin);
router.get("/origin/:slug", read);
router.put("/origin/:slug", authCheck, adminCheck, update);
router.patch("/origin/:slug", authCheck, adminCheck, removeSoft);
router.get("/origin/total", originCount);

module.exports = router;

// SCHEMAS

/**
 * @swagger
 * components:
 *  schemas:
 *      RecipeOrigin:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  trim: true
 *                  required: true
 *                  minlength: 2
 *                  maxlength: 50
 *              slug:
 *                  type: string
 *                  unique: true
 *                  lowercase: true
 *                  index: true
 *              status:
 *                  type: string
 *                  default: "Active"
 *                  enum: 
 *                      - "Active"
 *                      - "Inactive"
 *          example:
 *              name: España
 *              slug: españa
 *              status: Active
 *              
 */