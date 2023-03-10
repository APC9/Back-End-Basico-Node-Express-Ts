"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_1 = require("../controllers/users");
const db_validators_1 = require("../helpers/db-validators");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const router = (0, express_1.Router)();
router.get('/', users_1.getUsers);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existsUserById),
    (0, express_validator_1.check)('role').custom(db_validators_1.isValidRole),
    validar_campos_1.default
], users_1.putUsers);
router.post('/', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El correo no es valido').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.existsEmail),
    (0, express_validator_1.check)('role').custom(db_validators_1.isValidRole),
    validar_campos_1.default
], users_1.postUsers);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existsUserById),
    validar_campos_1.default
], users_1.deleteUSers);
exports.default = router;
//check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),  Validar role contra un arreglo de string
//# sourceMappingURL=users.js.map