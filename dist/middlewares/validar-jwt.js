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
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    ;
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer el usuario que corresponde al uid
        const user = yield user_1.default.findById(uid); // el user de req.user viene de la capeta types archivo index
        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - usuario borrado DB'
            });
        }
        //verificar si el uid tiene el estado en falso
        if ((user === null || user === void 0 ? void 0 : user.state) === false) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado en false'
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
});
exports.validarJWT = validarJWT;
//# sourceMappingURL=validar-jwt.js.map