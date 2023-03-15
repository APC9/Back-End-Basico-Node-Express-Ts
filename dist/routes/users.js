"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_1 = require("../controllers/users");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares");
const routerUser = (0, express_1.Router)();
routerUser.get('/', users_1.getUsers);
routerUser.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existsUserById),
    (0, express_validator_1.check)('role').custom(db_validators_1.isValidRole),
    middlewares_1.validarCampos
], users_1.putUsers);
routerUser.post('/', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El correo no es valido').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.existsEmail),
    (0, express_validator_1.check)('role').custom(db_validators_1.isValidRole),
    middlewares_1.validarCampos
], users_1.postUsers);
routerUser.delete('/:id', [
    middlewares_1.validarJWT,
    //isAdminRole, Validar si es administrador
    (0, middlewares_1.hasRole)('ADMIN_ROLE', 'SALES_ROLE'),
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existsUserById),
    middlewares_1.validarCampos
], users_1.deleteUSers);
exports.default = routerUser;
//check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),  Validar role contra un arreglo de string
//# sourceMappingURL=users.js.map