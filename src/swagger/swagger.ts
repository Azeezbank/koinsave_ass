import swaggerJsdoc from "swagger-jsdoc";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Koinsave API Documentation",
      version: "1.0.0",
      description: "API documentation for Koinsave backend assessment"
    },

    // Multiple servers
    servers: [
      { url: "http://localhost:3000", description: "Local Development" },
      { url: "https://koinsave-ass.onrender.com", description: "Production Server" }
    ],

    // Security definitions
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token here"
        }
      }
    },

    // Apply security globally
    security: [
      {
        BearerAuth: []
      }
    ]
  },

  // Path to your API docs (Swagger comments in your routes)
  apis: ["./src/swagger/*.ts"]
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);