const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const { create, recipesCount, listAll, removeSoft, read, update, list } = require("../controllers/recipe");

// Endpoints

/**
 * @swagger
 * /recipe:
 *  post:
 *      summary: Create recipe
 *      tags: [Recipe]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Recipe"
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
 *                          $ref: "#/components/schemas/Recipe"
 *          400:
 *              description: bad request
 */

router.post("/recipe", authCheck, adminCheck, create);

/**
 * @swagger
 * /recipes/count:
 *  get:
 *      tags: [Recipe]
 *      summary: "Total count of recipes active"
 *      responses:
 *          200:
 *              description: ok
 *          400:
 *              description: bad request
 */

router.get("/recipes/count", recipesCount);

/**
 * @swagger
 * /recipes/list:
 *  get:
 *      tags: [Recipe]
 *      summary: "All recipes active"
 *      responses:
 *          200:
 *              description: ok
 *          400:
 *              description: bad request
 */

router.get("/recipes/list", listAll);

/**
 * @swagger
 * /recipe/{slug}:
 *  patch:
 *      summary: RemoveSoft recipe
 *      tags: [Recipe]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Recipe"
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
 *                          $ref: "#/components/schemas/Recipe"
 *          400:
 *              description: bad request
 */

router.patch("/recipe/:slug", authCheck, adminCheck, removeSoft);

/**
 * @swagger
 * /recipe/{slug}:
 *  get:
 *      summary: Read recipe 
 *      tags: [Recipe]
 *      parameters: 
 *              - name: "slug"
 *                in: "path"
 *                description: "recipes slug search"
 *                required: "true"
 *                type: "string"
 *      responses:
 *          200:
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Recipe"
 *          400:
 *              description: bad request
 */

router.get("/recipe/:slug", read);

/**
 * @swagger
 * /recipe/{slug}:
 *  put:
 *      summary: Update recipe
 *      tags: [Recipe]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Recipe"
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
 *                          $ref: "#/components/schemas/Recipe"
 *          400:
 *              description: bad request
 */

router.put("/recipe/:slug", authCheck, adminCheck, update);

/**
 * @swagger
 * /recipes:
 *  get:
 *      tags: [Recipe]
 *      summary: "List of recipes"
 *      responses:
 *          200:
 *              description: ok
 *          400:
 *              description: bad request
 */
router.get("/recipes", list);

module.exports = router; 

// SCHEMAS

/**
 * @swagger
 * components:
 *  schemas:
 *      Recipe:
 *          type: object
 *          required:
 *              - title
 *              - description
 *              - servings
 *              - time
 *              - preparation
 *          properties:
 *              title:
 *                  type: string
 *                  trim: true
 *                  required: true
 *                  maxlength: 32
 *                  text: true
 *              description: 
 *                  type: string
 *                  required: true
 *                  maxlength: 2000
 *                  text: true
 *              servings:
 *                  type: "number"
 *                  required: true
 *                  trim: true
 *                  maxlength: 32
 *              time:
 *                  type: "number"
 *                  required: true
 *                  trim: true
 *                  maxlength: 32
 *              type:
 *                  type: objectId
 *                  ref: 'RecipeType'
 *              images: 
 *                  type: string
 *                  default: url
 *              label: 
 *                  type: string
 *                  enum: 
 *                      - "Desayuno"
 *                      - "Almuerzo"
 *                      - "Cena"
 *                      - "Merienda"
 *                      - "Cóctel"
 *                      - "Comida rápida"
 *                      - "Ensalada"
 *              origin: 
 *                  type: ObjectId
 *                  ref: 'RecipeOrigin'
 *              
 *              preparation:
 *                  type: string
 *                  required: true
 *                  maxlength: 4000
 *                  text: true
 *              status:
 *                  type: string
 *                  default: "Active"
 *                  enum: 
 *                      - "Active"
 *                      - "Inactive"
 *          example:
 *              title: "Paella"
 *              description: "Te traemos esta rica preparación que puedes disfrutar cuando no tienes tanto tiempo para estar cocinando pero quieres darte un gustito"
 *              servings: 5
 *              time: 45
 *              label: "Cena"
 *              origin: "629575bcdf0ab25854a199ce"
 *              preparation: "Primero cortar la cebolla y pimentones en cubitos, sofreír en un sartén con aceite y sal. Luego agregar las longanizad en trozos y revolver. En una olla sofreír el arroz con un poco de aceite hasta que empiece a tomar un tono blanco, en ese momento agregamos el tarro de mariscos sin el caldo(reservar), junto con la salsa de tomates. Mezclar el sofrito con el arroz, agregar las arvejas, el caldo de la lata de mariscos y 200ml de agua hirviendo. Sazonar con curry, cúrcuma y sal. Colocar los choritos sobre el arroz y dejar cocinar por 25 minutos a fuego bajo por 25 minutos. Servir caliente y a disfrutar!"
 *              
 */