import { Router } from 'express';
import { check } from 'express-validator';

import { getUsers, putUsers, postUsers, deleteUSers } from '../controllers/users';
import { existsEmail, isValidRole, existsUserById } from '../helpers';
import { validarCampos, validarJWT, hasRole } from '../middlewares';


export const routerUser: Router = Router();

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
routerUser.get('/', getUsers);

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
routerUser.put('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsUserById),
  check('role').custom(isValidRole),//validar role contra la BD
  validarCampos
  ], 
  putUsers );

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
routerUser.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min:6 }),
  check('email', 'El correo no es valido').isEmail(),
  check('email').custom(existsEmail),//Verificar si el correo existe
  check('role').custom(isValidRole),//validar role contra la BD
  validarCampos
  ], 
  postUsers );

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
routerUser.delete('/:id',[
  validarJWT,
  //isAdminRole, Validar si es administrador
  hasRole('ADMIN_ROLE', 'SALES_ROLE'),  // valida si tiene algunos de los roles enviados en los parametros
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsUserById),
  validarCampos
  ],
  deleteUSers);



//check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),  Validar role contra un arreglo de string