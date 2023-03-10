import { Router } from 'express';
import { check } from 'express-validator';

import { getUsers, putUsers, postUsers, deleteUSers } from '../controllers/users';
import {existsEmail, isValidRole, existsUserById} from '../helpers/db-validators';
import validarCampos from '../middlewares/validar-campos';

const router: Router = Router();

router.get('/', getUsers);

router.put('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsUserById),
  check('role').custom(isValidRole),//validar role contra la BD
  validarCampos
  ], 
  putUsers );

router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min:6 }),
  check('email', 'El correo no es valido').isEmail(),
  check('email').custom(existsEmail),//Verificar si el correo existe
  check('role').custom(isValidRole),//validar role contra la BD
  validarCampos
  ], 
  postUsers );

router.delete('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsUserById),
  validarCampos
  ],
  deleteUSers);


export default router;

//check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),  Validar role contra un arreglo de string