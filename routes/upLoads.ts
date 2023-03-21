import { Router } from 'express';
import { check } from 'express-validator';

import {validarCampos, validatefile} from '../middlewares';
import { fileUpload, getImage, updateImageCloudinay } from '../controllers/upLoads';

export const routerUpload: Router = Router();

routerUpload.post('/', validatefile, fileUpload );

routerUpload.put('/:collection/:id', [
  validatefile,
  check('id', 'No es un Id de mongo').isMongoId(),
  check('collection', 'no es una coleccion permitida').isIn(['users', 'products']),
  validarCampos
  ], 
  updateImageCloudinay
);

routerUpload.get('/:collection/:id',[
  check('id', 'No es un Id de mongo').isMongoId(),
  check('collection', 'no es una coleccion permitida').isIn(['users', 'products']),
  validarCampos
  ],
  getImage
);

