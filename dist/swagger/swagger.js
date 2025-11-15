import swaggerJsdoc from "swagger-jsdoc";
export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Koinsave API Documentation",
            version: "1.0.0",
            description: "API documentation for Koinsave backend assessment"
        },
        servers: [
            { url: "http://localhost:5000" }
        ]
    },
    apis: ["./src/swagger/*.ts"]
};
export const swaggerSpec = swaggerJsdoc(swaggerOptions);
