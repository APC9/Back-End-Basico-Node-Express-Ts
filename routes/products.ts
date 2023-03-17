import { Router } from 'express';
import { check } from 'express-validator';

import { getProducts, getProductsById, postProducts, putProducts, deleteProduct } from '../controllers/products';
import { validarJWT, validarCampos, isAdminRole } from '../middlewares';
import { existsProductById, existsCateryById } from '../helpers/db-validators';


export const routerProducts: Router = Router();

routerProducts.get('/', getProducts);

routerProducts.get('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsProductById),
  validarCampos
  ], 
  getProductsById
);

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

routerProducts.post('/',[
  validarJWT,
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('category', 'la categoria es obligatoria').not().isEmpty(),
  check('category', 'la Categoria No tiene un ID válido').isMongoId(),
  validarCampos
  ], 
  postProducts
);

routerProducts.delete('/:id',[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsProductById),
  isAdminRole,
  validarCampos
  ], 
  deleteProduct
);