"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const login_1 = require("../controllers/login");
const middlewares_1 = require("../middlewares");
const routerAuth = (0, express_1.Router)();
routerAuth.post('/login', [
    (0, express_validator_1.check)('email', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    middlewares_1.validarCampos
], login_1.login);
exports.default = routerAuth;
//# sourceMappingURL=auth.js.map