"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    role: { type: String, required: [true, 'El rol es requerido'] },
});
exports.default = (0, mongoose_1.model)('Role', roleSchema);
//# sourceMappingURL=role.js.map