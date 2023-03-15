import { Router } from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/login';
import {validarCampos} from '../middlewares';

const routerAuth: Router = Router();

routerAuth.post('/login',[
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
  ],
  login
);



export default routerAuth;