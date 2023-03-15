import { Router } from 'express';
import { check } from 'express-validator';

import { getUsers, putUsers, postUsers, deleteUSers } from '../controllers/users';
import { existsEmail, isValidRole, existsUserById } from '../helpers/db-validators';
import { validarCampos, validarJWT, hasRole } from '../middlewares';


const routerUser: Router = Router();

routerUser.get('/', getUsers);

routerUser.put('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsUserById),
  check('role').custom(isValidRole),//validar role contra la BD
  validarCampos
  ], 
  putUsers );

routerUser.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min:6 }),
  check('email', 'El correo no es valido').isEmail(),
  check('email').custom(existsEmail),//Verificar si el correo existe
  check('role').custom(isValidRole),//validar role contra la BD
  validarCampos
  ], 
  postUsers );

routerUser.delete('/:id',[
  validarJWT,
  //isAdminRole, Validar si es administrador
  hasRole('ADMIN_ROLE', 'SALES_ROLE'),  // valida si tiene algunos de los roles enviados en los parametros
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsUserById),
  validarCampos
  ],
  deleteUSers);


export default routerUser;

//check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),  Validar role contra un arreglo de string