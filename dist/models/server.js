"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("../docs/swagger"));
const config_1 = __importDefault(require("../db/config"));
const routes_1 = require("../routes");
const products_1 = require("../routes/products");
class Server {
    constructor() {
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            documentation: '/documentation',
            products: '/api/products',
            users: '/api/users'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        //Conectar a BD
        this.conectarDB();
        //middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.default)();
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //lectura y parseo del body
        this.app.use(express_1.default.json());
        //Directorio publico
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.paths.auth, routes_1.routerAuth);
        this.app.use(this.paths.categories, routes_1.routerCategories);
        this.app.use(this.paths.documentation, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
        this.app.use(this.paths.products, products_1.routerProducts);
        this.app.use(this.paths.users, routes_1.routerUser);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map