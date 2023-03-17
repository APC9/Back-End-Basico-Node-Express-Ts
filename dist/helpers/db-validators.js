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
exports.existsProductById = exports.existsCateryById = exports.existsUserById = exports.existsEmail = exports.isValidRole = void 0;
const category_1 = __importDefault(require("../models/category"));
const product_1 = __importDefault(require("../models/product"));
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const isValidRole = (role = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existsRole = yield role_1.default.findOne({ role });
    if (!existsRole) {
        throw new Error(`El rol ${role} no esta registrado en la BD`);
    }
});
exports.isValidRole = isValidRole;
const existsEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existsEmail = yield user_1.default.findOne({ email });
    if (existsEmail) {
        throw new Error(`El email ${email} ya esta registrado en la BD`);
    }
    ;
});
exports.existsEmail = existsEmail;
const existsUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_1.default.findById(id);
    if (!existsUser) {
        throw new Error(`El usuario con el id: ${id} no existe en la BD`);
    }
    ;
});
exports.existsUserById = existsUserById;
const existsCateryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existsCategory = yield category_1.default.findById(id);
    if (!existsCategory) {
        throw new Error(`La Categoria con el id: ${id} no existe en la BD`);
    }
    ;
});
exports.existsCateryById = existsCateryById;
const existsProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existsProduct = yield product_1.default.findById(id);
    if (!existsProduct) {
        throw new Error(`El producto con el id: ${id} no existe en la BD`);
    }
    ;
});
exports.existsProductById = existsProductById;
//# sourceMappingURL=db-validators.js.map