"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'El nombre es requerido'], unique: true },
    state: { type: Boolean, default: true, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, default: 0 },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String },
    available: { type: Boolean, default: true },
    img: { type: String }
});
productSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, rest = __rest(_a, ["__v", "_id"]);
    rest.uid = _id;
    return rest;
};
exports.default = (0, mongoose_1.model)('Product', productSchema);
//# sourceMappingURL=product.js.map