// require("./db/connection");

//#region "imports"
const { sequelize } = require("./db/connection");
const express = require("express");

//#region "swagger"
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Learning Rest API",
            description: "A project with CodeNations to learn APIs",
            contact: {
                name: "Ian",
            },
            servers: ["http://localhost:5000"],
        },
    },
    // ['.routes/*.js']
    apis: ["src/auth/authRoutes.js", "src/user/userRoutes.js", "src/food/foodRoutes.js", "src/server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//#end region

const cors = require("cors");
const userRouter = require("./user/userRoutes");
const authRouter = require("./auth/authRoutes");
const foodRouter = require("./food/foodRoutes");

//#endregion

const syncTables = async () => {
    sequelize.sync();
};

syncTables();

const app = express();

const port = process.env.PORT || 5001;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(foodRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//health manager
app.get("/health", (request, response) => {
    response.status(200).send({ message: "API is working" });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
