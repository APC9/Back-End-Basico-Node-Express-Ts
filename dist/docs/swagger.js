"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion de mi API Cafe-Node",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:8081",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            },
        },
        parameters: {
            limitParam: {
                name: "limit",
                in: "query",
                description: "número de resultados a obtener",
                example: 5,
                default: 5,
                required: false,
                schema: {
                    type: "integer"
                },
            },
            tokeParam: {
                name: "x-token",
                in: "header",
                description: "JWT",
                required: true,
                schema: {
                    type: "string"
                },
            },
            fromParam: {
                name: "from",
                in: "query",
                description: "número de inicio de busqueda resultados",
                example: 0,
                default: 0,
                required: false,
                schema: {
                    type: "integer"
                },
            },
            idParam: {
                name: "id",
                in: "path",
                description: "ID registrado en la BD",
                example: "64147124b145cb97a41d38ef",
                required: true,
                schema: {
                    type: "string"
                },
            },
        },
        schemas: {
            user: {
                type: "object",
                required: ["name", "email", "password", "role"],
                properties: {
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                    img: {
                        type: "string",
                    },
                    role: {
                        type: "string",
                    },
                    state: {
                        type: "boolean",
                    },
                    google: {
                        type: "boolean",
                    },
                },
            },
            category: {
                type: "object",
                required: ["name", "state", "user"],
                properties: {
                    name: {
                        type: "string",
                    },
                    state: {
                        type: "boolean",
                    },
                    user: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                            },
                            id: {
                                type: "string",
                            },
                        },
                    },
                },
            },
            product: {
                type: "object",
                required: ["name", "state", "user", "category"],
                properties: {
                    name: {
                        type: "string",
                    },
                    state: {
                        type: "boolean",
                    },
                    user: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                            },
                            id: {
                                type: "string",
                            },
                        },
                    },
                    price: {
                        type: "number",
                    },
                    category: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                            },
                            id: {
                                type: "string",
                            },
                        },
                    },
                    description: {
                        type: "string",
                    },
                    available: {
                        type: "boolean",
                    },
                },
            },
            loginUser: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    }
                },
            },
            role: {
                type: "object",
                required: ["role"],
                properties: {
                    role: {
                        type: "string",
                    },
                },
            },
        },
    },
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ["./routes/*.ts"],
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
//# sourceMappingURL=swagger.js.map