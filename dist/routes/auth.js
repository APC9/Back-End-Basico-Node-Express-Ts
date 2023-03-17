"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const login_1 = require("../controllers/login");
const middlewares_1 = require("../middlewares");
exports.routerAuth = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 * /api/auth/login:
 *    post:
 *      tags:
 *        - Auth
 *      summary: "Login usuario"
 *      description: Este endpoint es para el Login de usuarios
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/loginUser"
 *      responses:
 *        '201':
 *          description: Retorna el objeto del usuario logueado y el JWT.
 *        '400':
 *          description: Error de validacion.
 */
exports.routerAuth.post('/login', [
    (0, express_validator_1.check)('email', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    middlewares_1.validarCampos
], login_1.login);
/**
 * Post track
 * @openapi
 * /api/auth/google:
 *    post:
 *      tags:
 *        - Auth
 *      summary: "Login usuario con google"
 *      description: Este endpoint es para el Login de usuarios con el boton Google-SignIn en sitio web http://localhost:8081/
 *      responses:
 *        '201':
 *          description: Retorna el objeto del usuario logueado y el JWT.
 *        '400':
 *          description: Error de validacion.
 */
exports.routerAuth.post('/google', [
    (0, express_validator_1.check)('id_token', 'Id-token es necesario').not().isEmpty(),
    middlewares_1.validarCampos
], login_1.googleSignIn);
//export default routerAuth;
//# sourceMappingURL=auth.js.map