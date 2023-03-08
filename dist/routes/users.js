"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.get('/', users_1.getUsers);
router.put('/:id', users_1.putUsers);
router.post('/', users_1.postUsers);
router.delete('/', users_1.deleteUSers);
router.patch('/', users_1.patchUsers);
exports.default = router;
//# sourceMappingURL=users.js.map