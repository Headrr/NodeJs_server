const express = require("express");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

const { create, productsCount, listAll, removeSoft, read, update, list } = require("../controllers/product");

/**
 * @swagger
 * /product:
 *  post:
 *      summary: Create product
 *      tags: [Product]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Product"
 *      responses:
 *          200:
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          400:
 *              description: bad request
 */

router.post("/product", authCheck, adminCheck, create);

/**
 * @swagger
 * /products/total:
 *  get:
 *      tags:
 *          - name: "Product"
 *      summary: "All products active"
 *      responses:
 *          200:
 *              description: ok
 */
router.get("/products/total", productsCount);

/**
 * @swagger
 *  /products/{count}:
 *      get:
 *          tags:
 *              - name: "Product"
 *          summary: "All products active by count"
 *          parameters: 
 *          - name: "count"
 *          in: "path"
 *          description: "count product search"
 *          required: "true"
 *          type: "integer"
 *          format: "int64"
 * 
 *          responses:
 *              200:
 *                  description: ok
 */
router.get("/products/:count", listAll);
router.patch("/product/:slug", removeSoft);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.post("/products", list);

module.exports = router;

// SCHEMAS

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          required:
 *              - title
 *              - description
 *              - price
 *          properties:
 *              title:
 *                  type: string
 *                  trim: true
 *                  maxlength: 32
 *                  text: true
 *              description:
 *                  type: string
 *                  maxlength: 2000
 *                  text: true
 *              price: 
 *                  type: "integer"
 *                  trim: true
 *                  maxlength: 32
 *          example:
 *              title: War axxe
 *              description: Axxe of war
 *              price: 150
 */