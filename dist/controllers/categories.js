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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategories = exports.putCategories = exports.postCategories = exports.getCategoriesById = exports.getCategories = void 0;
const category_1 = __importDefault(require("../models/category"));
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 5 } = req.query;
    const query = { state: true };
    const [total, categories] = yield Promise.all([
        category_1.default.countDocuments(query),
        category_1.default.find(query).limit(+limit).populate('user', 'name')
    ]);
    res.json({
        total,
        categories
    });
});
exports.getCategories = getCategories;
const getCategoriesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = { state: true };
    const category = yield category_1.default.findById(id).find(query).populate('user', 'name');
    res.json({
        category
    });
});
exports.getCategoriesById = getCategoriesById;
const postCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const name = req.body.name.toUpperCase();
    const categoryDB = yield category_1.default.findOne({ name });
    if (categoryDB) {
        res.status(400).json({
            msg: `La categoria ${categoryDB.name} ya existe en la BD`
        });
    }
    //Generar la data a guardar
    const data = {
        name,
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id
    };
    const category = new category_1.default(data);
    //Guardar en DB
    yield category.save();
    res.status(201).json(category);
});
exports.postCategories = postCategories;
const putCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { state, user } = _b, data = __rest(_b, ["state", "user"]);
    let category = yield category_1.default.findById(id);
    if ((category === null || category === void 0 ? void 0 : category.state) === false) {
        return res.status(400).json({
            msg: 'No existe una categoria con ese ID'
        });
    }
    ;
    data.name = data.name.toUpperCase();
    const nameCategory = yield category_1.default.findOne({ name: data.name });
    if (nameCategory) {
        return res.status(400).json({
            msg: `La categoria ${data.name} ya existe en la BD`
        });
    }
    ;
    category = yield category_1.default.findByIdAndUpdate(id, data, { new: true }).populate('user', 'name');
    res.status(202).json({
        category
    });
});
exports.putCategories = putCategories;
const deleteCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield category_1.default.findByIdAndUpdate(id, { state: false }).populate('user', 'name');
    if ((category === null || category === void 0 ? void 0 : category.state) === false) {
        return res.status(400).json({
            msg: 'No existe una categoria con ese ID'
        });
    }
    ;
    res.json({
        category
    });
});
exports.deleteCategories = deleteCategories;
//# sourceMappingURL=categories.js.map