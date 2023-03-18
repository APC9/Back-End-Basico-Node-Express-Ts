import { Router } from 'express';
import { check } from 'express-validator';

import { getProducts, getProductsById, postProducts, putProducts, deleteProduct } from '../controllers/products';
import { validarJWT, validarCampos, isAdminRole } from '../middlewares';
import { existsProductById, existsCateryById } from '../helpers';


export const routerProducts: Router = Router();

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
routerProducts.get('/', getProducts);

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
routerProducts.get('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsProductById),
  validarCampos
  ], 
  getProductsById
);

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
routerProducts.put('/:id',[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsProductById),
  check('category').optional().custom(existsCateryById),
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
  ], 
  putProducts
);

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
routerProducts.post('/',[
  validarJWT,
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('category', 'la categoria es obligatoria').not().isEmpty(),
  check('category', 'la Categoria No tiene un ID válido').isMongoId(),
  validarCampos
  ], 
  postProducts
);

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
routerProducts.delete('/:id',[
  validarJWT,
  isAdminRole,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsProductById),
  isAdminRole,
  validarCampos
  ], 
  deleteProduct
);