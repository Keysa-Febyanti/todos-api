const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Todos-List Management API",
    version: "1.0.0",
    description: "API documentation for Todos-List Management application"
  },
  servers: [
    {
      url: "https://todos-api.vercel.app",
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
  },
  security: [{ bearerAuth: [] }],
  tags: [
    { name: "Auth", description: "Authentication and user endpoints" },
    { name: "Todos", description: "Todo management endpoints" },
    { name: "Categories", description: "Category management endpoints" },
    { name: "ActivityLogs", description: "Activity log endpoints" },
    { name: "Stats", description: "Statistics endpoints" }
  ],
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", example: "Keysa Febyanti" },
                  email: { type: "string", example: "keysa@example.com" },
                  password: { type: "string", example: "Password123" }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "User registered successfully" },
          400: { description: "Invalid input" }
        }
      }
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user and receive JWT token",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "keysa@example.com" },
                  password: { type: "string", example: "Password123" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Login successful" },
          401: { description: "Unauthorized" }
        }
      }
    },
    "/api/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get current logged-in user",
        responses: {
          200: { description: "Current user profile" },
          401: { description: "Unauthorized" }
        }
      }
    },
    "/api/todos": {
      get: {
        tags: ["Todos"],
        summary: "Get all todos",
        responses: {
          200: { description: "List of todos" },
          401: { description: "Unauthorized" }
        }
      },
      post: {
        tags: ["Todos"],
        summary: "Create a new todo",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title"],
                properties: {
                  title: { type: "string", example: "Finish Manual Book Teknis" },
                  description: { type: "string", example: "Export PDF and upload" },
                  completed: { type: "boolean", example: false }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Todo created" },
          400: { description: "Bad request" }
        }
      }
    },
    "/api/todos/{id}": {
      get: {
        tags: ["Todos"],
        summary: "Get todo by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Todo detail" },
          404: { description: "Todo not found" }
        }
      },
      patch: {
        tags: ["Todos"],
        summary: "Update todo by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  completed: { type: "boolean" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Todo updated" },
          404: { description: "Todo not found" }
        }
      },
      delete: {
        tags: ["Todos"],
        summary: "Delete todo by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Todo deleted" },
          404: { description: "Todo not found" }
        }
      }
    },
    "/api/categories": {
      get: {
        tags: ["Categories"],
        summary: "Get all categories",
        responses: {
          200: { description: "List of categories" }
        }
      },
      post: {
        tags: ["Categories"],
        summary: "Create a new category",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string", example: "Belajar" },
                  description: { type: "string", example: "Kategori untuk kegiatan belajar" }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Category created" }
        }
      }
    },
    "/api/categories/{id}": {
      get: {
        tags: ["Categories"],
        summary: "Get one category by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Category retrieved successfully" },
          404: { description: "Category not found" }
        }
      },
      patch: {
        tags: ["Categories"],
        summary: "Update a category by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Belajar dan Tugas" },
                  description: { type: "string", example: "Kategori untuk tugas sekolah" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Category updated successfully" },
          404: { description: "Category not found" }
        }
      },
      delete: {
        tags: ["Categories"],
        summary: "Delete a category by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          204: { description: "Category deleted successfully" },
          404: { description: "Category not found" }
        }
      }
    },
    "/api/activity-logs": {
      get: {
        tags: ["ActivityLogs"],
        summary: "Get activity logs",
        responses: {
          200: { description: "List of activity logs" }
        }
      }
    },
    "/api/stats": {
      get: {
        tags: ["Stats"],
        summary: "Get todo statistics",
        responses: {
          200: { description: "Statistics summary" }
        }
      }
    }
  }
};

module.exports = swaggerSpec;