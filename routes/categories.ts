import { Router } from 'express';
import { check } from 'express-validator';

import { deleteCategories, getCategories, getCategoriesById, 
          postCategories, putCategories } from '../controllers/categories';
          
import { isAdminRole, validarCampos, validarJWT } from '../middlewares';
import { existsCateryById } from '../helpers/db-validators';

export const routerCategories: Router = Router();

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
routerCategories.get('/', getCategories);

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
routerCategories.get('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsCateryById),
  validarCampos
  ], 
  getCategoriesById
);

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
routerCategories.post('/', [
  validarJWT, 
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
  ],postCategories
);

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
routerCategories.put('/:id',[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsCateryById),
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
  ], 
  putCategories
);

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
routerCategories.delete('/:id',[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsCateryById),
  isAdminRole,
  validarCampos
  ], 
  deleteCategories
);

