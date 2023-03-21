"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUpload = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const upLoads_1 = require("../controllers/upLoads");
exports.routerUpload = (0, express_1.Router)();
exports.routerUpload.post('/', middlewares_1.validatefile, upLoads_1.fileUpload);
exports.routerUpload.put('/:collection/:id', [
    middlewares_1.validatefile,
    (0, express_validator_1.check)('id', 'No es un Id de mongo').isMongoId(),
    (0, express_validator_1.check)('collection', 'no es una coleccion permitida').isIn(['users', 'products']),
    middlewares_1.validarCampos
], upLoads_1.updateImageCloudinay);
exports.routerUpload.get('/:collection/:id', [
    (0, express_validator_1.check)('id', 'No es un Id de mongo').isMongoId(),
    (0, express_validator_1.check)('collection', 'no es una coleccion permitida').isIn(['users', 'products']),
    middlewares_1.validarCampos
], upLoads_1.getImage);
//# sourceMappingURL=upLoads.js.map