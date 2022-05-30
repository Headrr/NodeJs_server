const express = require("express");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

const {
  create,
  list,
  read,
  update,
  remove,
  removeSoft,
} = require("./../controllers/category");
// middlewares de pre-procesos

// middlewares de lógica de negocio / controllers

// middlwares de validaciones de parameters / express-validator

// routes
// PRINCIPIO SOLID: Inyección de Dependencias
// PRINCIPIO SOLOD: Inversión de Dependencias

// Endpoints
// YAML

/**
 * @swagger
 * /category:
 *  post:
 *      summary: Create category
 *      tags: [Category]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Category"
 *      parameters:
 *      - name: authtoken
 *        in: header
 *        description: an authorization token JWT-ouath2
 *      responses:
 *          200:
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Category"
 *          400:
 *              description: bad request
 */

router.post("/category", authCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", update);
router.delete("/category/:slug", remove);
router.patch("/category/:slug", removeSoft);
// soft delete es una deshabilitación

module.exports = router;

// SCHEMAS

/**
 * @swagger
 * components:
 *  schemas:
 *      Category:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  trim: true
 *                  minlength: 2
 *                  maxlength: 32
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
 *              name: Fashion
 *              slug: fashion
 *              status: Active
 */
