"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerCategories = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const categories_1 = require("../controllers/categories");
const middlewares_1 = require("../middlewares");
const db_validators_1 = require("../helpers/db-validators");
exports.routerCategories = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 * /api/categories:
 *    get:
 *      tags:
 *        - categories
 *      summary: "Obtener categorias"
 *      description: Este End-point es para ver las categorias registradas en la BD
 *      parameters:
 *       - $ref: "#/components/parameters/limitParam"
 *       - $ref: "#/components/parameters/fromParam"
 *      responses:
 *        '200':
 *          description: Retorna un arreglo de objeto con las categorias.
 */
exports.routerCategories.get('/', categories_1.getCategories);
/**
 * Post track
 * @openapi
 * /api/categories/{id}:
 *    get:
 *      tags:
 *        - categories
 *      summary: "Obtener categoria por ID"
 *      description: Este End-point es para obtener una categoria por ID
 *      operationId:
 *      parameters:
 *       - $ref: "#/components/parameters/idParam"
 *      responses:
 *        '200':
 *          description: Retorna una categoria.
 */
exports.routerCategories.get('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existsCateryById),
    middlewares_1.validarCampos
], categories_1.getCategoriesById);
/**
 * Post track
 * @openapi
 * /api/categories:
 *    post:
 *      tags:
 *        - categories
 *      summary: "Crear una categoria"
 *      description: Este endpoint es para crear una categoria
 *      operationId:
 *      parameters:
 *       - $ref: "#/components/parameters/tokeParam"
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/category"
 *      responses:
 *        '201':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '400':
 *          description: Error de validacion.
 */
exports.routerCategories.post('/', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    middlewares_1.validarCampos
], categories_1.postCategories);
/**
 * Post track
 * @openapi
 * /api/categories/{id}:
 *    put:
 *      tags:
 *        - categories
 *      summary: "editar categoria"
 *      description: Este endpoint es para editar una categoria
 *      operationId:
 *      parameters:
 *       - $ref: "#/components/parameters/idParam"
 *       - $ref: "#/components/parameters/tokeParam"
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/category"
 *      responses:
 *        '200':
 *          description: Retorna el objeto editado en la coleccion.
 *        '400':
 *          description: Error de validacion.
 */
exports.routerCategories.put('/:id', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existsCateryById),
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    middlewares_1.validarCampos
], categories_1.putCategories);
/**
 * Post track
 * @openapi
 * /api/categories/{id}:
 *    delete:
 *      tags:
 *        - categories
 *      summary: "Eliminar Categoria"
 *      description: Este End-point es para eliminar Categoria
 *      operationId:
 *      parameters:
 *       - $ref: "#/components/parameters/idParam"
 *       - $ref: "#/components/parameters/tokeParam"
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/category"
 *      responses:
 *        '200':
 *          description: Retorna el objeto eliminado en la coleccion.
 *        '400':
 *          description: No existe un Categoria con ese ID
 *        '401':
 *          description: No hay token en la peticion o El servicio requiere uno de estos roles ADMIN_ROLE,SALES_ROLE
 *      security:
 *       - bearerAuth: []
 */
exports.routerCategories.delete('/:id', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existsCateryById),
    middlewares_1.isAdminRole,
    middlewares_1.validarCampos
], categories_1.deleteCategories);
//# sourceMappingURL=categories.js.map