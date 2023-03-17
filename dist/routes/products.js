"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerProducts = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const products_1 = require("../controllers/products");
const middlewares_1 = require("../middlewares");
const db_validators_1 = require("../helpers/db-validators");
exports.routerProducts = (0, express_1.Router)();
exports.routerProducts.get('/', products_1.getProducts);
exports.routerProducts.get('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existsProductById),
    middlewares_1.validarCampos
], products_1.getProductsById);
exports.routerProducts.put('/:id', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existsProductById),
    (0, express_validator_1.check)('category').optional().custom(db_validators_1.existsCateryById),
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    middlewares_1.validarCampos
], products_1.putProducts);
exports.routerProducts.post('/', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('category', 'la categoria es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('category', 'la Categoria No tiene un ID válido').isMongoId(),
    middlewares_1.validarCampos
], products_1.postProducts);
exports.routerProducts.delete('/:id', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existsProductById),
    middlewares_1.isAdminRole,
    middlewares_1.validarCampos
], products_1.deleteProduct);
//# sourceMappingURL=products.js.map