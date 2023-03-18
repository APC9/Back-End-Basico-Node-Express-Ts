"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCategory = void 0;
const mongoose_1 = require("mongoose");
const category_1 = __importDefault(require("../models/category"));
const searchCategory = (term = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const isMongoID = (0, mongoose_1.isValidObjectId)(term);
    if (isMongoID) {
        const category = yield category_1.default.findById(term);
        return res.json({
            results: (category) ? [category] : []
        });
    }
    const regex = new RegExp(term, 'i'); // termino insencible a mayuscula a miniscula
    const category = yield category_1.default.find({
        $or: [{ name: regex }],
        $and: [{ state: true }]
    });
    res.json({
        results: category
    });
});
exports.searchCategory = searchCategory;
//# sourceMappingURL=searchCategory%20copy.js.map