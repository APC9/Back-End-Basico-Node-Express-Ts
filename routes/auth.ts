import { Router } from 'express';
import { check } from 'express-validator';

import { googleSignIn, login } from '../controllers/login';
import {validarCampos} from '../middlewares';

export const routerAuth: Router = Router();

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
 *                  properties:
 *                    email:
 *                      type: string
 *                    password:
 *                      type: string
 *      responses:
 *        '201':
 *          description: Retorna el objeto del usuario logueado y el JWT.
 *        '400':
 *          description: Error de validacion.
 */
routerAuth.post('/login',[
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
  ],
  login
);

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
routerAuth.post('/google',[
  check('id_token', 'Id-token es necesario').not().isEmpty(),
  validarCampos
  ],
  googleSignIn
);


//export default routerAuth;