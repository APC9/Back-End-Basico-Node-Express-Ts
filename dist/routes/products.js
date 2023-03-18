"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerProducts = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const products_1 = require("../controllers/products");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
exports.routerProducts = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 * /api/products:
 *    get:
 *      tags:
 *        - products
 *      summary: "Obtener productos"
 *      description: Este End-point es para ver los productos registrados en la BD
 *      parameters:
 *       - $ref: "#/components/parameters/limitParam"
 *       - $ref: "#/components/parameters/fromParam"
 *      responses:
 *        '200':
 *          description: Retorna un arreglo de objeto con las categorias.
 */
exports.routerProducts.get('/', products_1.getProducts);
/**
 * Post track
 * @openapi
 * /api/products/{id}:
 *    get:
 *      tags:
 *        - products
 *      summary: "Obtener productos por ID"
 *      description: Este End-point es para obtener un producto por ID
 *      operationId:
 *      parameters:
 *       - $ref: "#/components/parameters/idParam"
 *      responses:
 *        '200':
 *          description: Retorna una categoria.
 */
exports.routerProducts.get('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.existsProductById),
    middlewares_1.validarCampos
], products_1.getProductsById);
/**
 * Post track
 * @openapi
 * /api/products/{id}:
 *    put:
 *      tags:
 *        - products
 *      summary: "editar producto"
 *      description: Este endpoint es para editar un producto
 *      operationId:
 *      parameters:
 *       - $ref: "#/components/parameters/idParam"
 *       - $ref: "#/components/parameters/tokeParam"
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                  properties:
 *                    name:
 *                      type: string
 *                    category:
 *                      type: string
 *                    description:
 *                      type: string
 *                    price:
 *                      type: number
 *      responses:
 *        '200':
 *          description: Retorna el objeto editado en la coleccion.
 *        '400':
 *          description: Error de validacion.
 */
exports.routerProducts.put('/:id', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.existsProductById),
    (0, express_validator_1.check)('category').optional().custom(helpers_1.existsCateryById),
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    middlewares_1.validarCampos
], products_1.putProducts);
/**
 * Post track
 * @openapi
 * /api/products:
 *    post:
 *      tags:
 *        - products
 *      summary: "Crear un producto"
 *      description: Este endpoint es para crear un producto
 *      operationId:
 *      parameters:
 *       - $ref: "#/components/parameters/tokeParam"
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                  properties:
 *                    name:
 *                      type: string
 *                    category:
 *                      type: string
 *                    description:
 *                      type: string
 *                    price:
 *                      type: number
 *      responses:
 *        '201':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '400':
 *          description: Error de validacion.
 */
exports.routerProducts.post('/', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('category', 'la categoria es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('category', 'la Categoria No tiene un ID válido').isMongoId(),
    middlewares_1.validarCampos
], products_1.postProducts);
/**
 * Post track
 * @openapi
 * /api/products/{id}:
 *    delete:
 *      tags:
 *        - products
 *      summary: "Eliminar producto"
 *      description: Este End-point es para eliminar producto
 *      operationId:
 *      parameters:
 *       - $ref: "#/components/parameters/idParam"
 *       - $ref: "#/components/parameters/tokeParam"
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
exports.routerProducts.delete('/:id', [
    middlewares_1.validarJWT,
    middlewares_1.isAdminRole,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.existsProductById),
    middlewares_1.isAdminRole,
    middlewares_1.validarCampos
], products_1.deleteProduct);
//# sourceMappingURL=products.js.map