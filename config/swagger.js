const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todos-List Management API",
      version: "1.0.0",
      description:
        "API documentation for Todos-List Management application"
    },
    servers: [
      {
        url: "https://todos-api-jet.vercel.app",
        description: "Production Server (Vercel)"
      },
      {
        url: "http://localhost:3000",
        description: "Local Development Server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        },
        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key"
        }
      }
    }
  },
  apis: [path.join(__dirname, "../routes/*.js")]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;