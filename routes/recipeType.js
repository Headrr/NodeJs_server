const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const { create, list, read, update, removeSoft, typeCount} = require("./../controllers/recipeType");

// Endpoints

/**
 * @swagger
 * /type:
 *  post:
 *      summary: Create recipe type
 *      tags: [RecipeType]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/RecipeType"
 *      parameters:
 *      - name: authtoken
 *        in: header
 *        description: an authorization token JWT
 *      responses:
 *          200:
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/RecipeType"
 *          400:
 *              description: bad request
 */
router.post("/type", authCheck, adminCheck, create);


/**
 * @swagger
 * /types:
 *  get:
 *      tags: [RecipeType]
 *      summary: "List recipes"
 *      responses:
 *          200:
 *              description: ok
 *          400:
 *              description: bad request
 */
router.get("/types", list);

/**
 * @swagger
 *  /type/{slug}:
 *      get:
 *          tags: [RecipeType]
 *          summary: "Recipe search by slug"
 *          parameters: 
 *              - name: "slug"
 *                in: "path"
 *                description: "recipes slug search"
 *                required: "true"
 *                type: "string"
 *          responses:
 *              200:
 *                  description: ok
 */

router.get("/type/:slug", read);

/**
 * @swagger
 * /type/{slug}:
 *  put:
 *      summary: Update recipe type
 *      tags: [RecipeType]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/RecipeType"
 *      parameters: 
 *              - name: "slug"
 *                in: "path"
 *                description: "recipes slug search"
 *                required: "true"
 *                type: "string"
 *              - name: authtoken
 *                in: header
 *                description: an authorization token JWT
 *      responses:
 *          200:
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/RecipeType"
 *          400:
 *              description: bad request
 */

router.put("/type/:slug", authCheck, adminCheck, update);

/**
 * @swagger
 * /type/{slug}:
 *  patch:
 *      summary: RemoveSoft recipe type
 *      tags: [RecipeType]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/RecipeType"
 *      parameters: 
 *              - name: "slug"
 *                in: "path"
 *                description: "recipes slug removeSoft"
 *                required: "true"
 *                type: "string"
 *              - name: authtoken
 *                in: header
 *                description: an authorization token JWT
 *      responses:
 *          200:
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/RecipeType"
 *          400:
 *              description: bad request
 */

router.patch("/type/:slug", authCheck, adminCheck, removeSoft);

/**
 * @swagger
 *  /type/total:
 *      get:
 *          tags: [RecipeType]
 *          summary: "All recipes active"
 * 
 *          responses:
 *              200:
 *                  description: ok
 */
router.get("/type/total", typeCount);

module.exports = router;

// SCHEMAS

/**
 * @swagger
 * components:
 *  schemas:
 *      RecipeType:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  trim: true
 *                  required: true
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
 *              name: Almuerzo
 *              slug: almuerzo
 *              status: Active
 *              
 */