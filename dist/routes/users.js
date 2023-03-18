"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_1 = require("../controllers/users");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
exports.routerUser = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 * /api/users:
 *    get:
 *      tags:
 *        - users
 *      summary: "Obtener usuarios"
 *      description: Este endpoint es para ver los usuarios registrados en la BD
 *      parameters:
 *       - $ref: "#/components/parameters/limitParam"
 *       - $ref: "#/components/parameters/fromParam"
 *      responses:
 *        '200':
 *          description: Retorna un arreglo de objeto con los usuarios.
 */
exports.routerUser.get('/', users_1.getUsers);
/**
 * Post track
 * @openapi
 * /api/users/{id}:
 *    put:
 *      tags:
 *        - users
 *      summary: "editar usuario"
 *      description: Este endpoint es para editar los usuarios
 *      operationId:
 *      parameters:
 *       - $ref: "#/components/parameters/idParam"
 *      responses:
 *        '200':
 *          description: Retorna el objeto editado en la coleccion.
 *        '400':
 *          description: Error de validacion.
 */
exports.routerUser.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.existsUserById),
    (0, express_validator_1.check)('role').custom(helpers_1.isValidRole),
    middlewares_1.validarCampos
], users_1.putUsers);
/**
 * Post track
 * @openapi
 * /api/users:
 *    post:
 *      tags:
 *        - users
 *      summary: "Crear usuario"
 *      description: Este endpoint es para crear los usuarios
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        '201':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '400':
 *          description: Error de validacion.
 */
exports.routerUser.post('/', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El correo no es valido').isEmail(),
    (0, express_validator_1.check)('email').custom(helpers_1.existsEmail),
    (0, express_validator_1.check)('role').custom(helpers_1.isValidRole),
    middlewares_1.validarCampos
], users_1.postUsers);
/**
* Post track
* @openapi
* /api/users/{id}:
*    delete:
*      tags:
*        - users
*      summary: "Eliminar usuario"
*      description: Este endpoint es para eliminar los usuarios
*      operationId:
*      parameters:
*       - $ref: "#/components/parameters/idParam"
*       - $ref: "#/components/parameters/tokeParam"
*      requestBody:
*          content:
*            application/json:
*              schema:
*                $ref: "#/components/schemas/user"
*      responses:
*        '200':
*          description: Retorna el objeto eliminado en la coleccion.
*        '400':
*          description: No existe un usuario con ese ID
*        '401':
*          description: No hay token en la peticion o El servicio requiere uno de estos roles ADMIN_ROLE,SALES_ROLE
*      security:
*       - bearerAuth: []
*/
exports.routerUser.delete('/:id', [
    middlewares_1.validarJWT,
    //isAdminRole, Validar si es administrador
    (0, middlewares_1.hasRole)('ADMIN_ROLE', 'SALES_ROLE'),
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.existsUserById),
    middlewares_1.validarCampos
], users_1.deleteUSers);
//check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),  Validar role contra un arreglo de string
//# sourceMappingURL=users.js.map