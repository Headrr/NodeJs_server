const express = require("express");
const connectDB = require("./database");
//const morgan = require("morgan");
// const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerConfig = require("./documentation/swagger.config.json");

require("dotenv").config();
const userRoutes = require("./routes/user");

// app middleware express
const app = express();

// db
connectDB();

// middlewares server
//app.use(morgan("dev"));
// app.use(bodyParser.json({ limit: "2mb" })) // definición antigua -> deprecated => v14.x.9
app.use(express.json({ limit: "2mb" })); // definición estándar y moderna
const swaggerDocs = swaggerJsdoc(swaggerConfig);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs, { explorer: true }))
app.use(cors());
// app.use("/api", userRoutes); // pasando un middleware de ruta
// app.use(userRoutes);

// bad practice
// app.use(userRoutes);
// app.use(productRoutes);
// app.use(categoryRoutes);

// fs - good practice
readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);
// port  (listener)
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
