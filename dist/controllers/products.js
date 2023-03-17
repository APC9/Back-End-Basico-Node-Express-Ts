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
exports.deleteProduct = exports.putProducts = exports.postProducts = exports.getProductsById = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 5 } = req.query;
    const query = { state: true };
    const [total, product] = yield Promise.all([
        product_1.default.countDocuments(query),
        product_1.default.find(query).limit(+limit).populate('user', 'name').populate('category', 'name')
    ]);
    res.json({
        total,
        product
    });
});
exports.getProducts = getProducts;
const getProductsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = { state: true };
    const product = yield product_1.default.findById(id).find(query)
        .populate('user', 'name').populate('category', 'name');
    if (product.length === 0) {
        res.json({
            msg: 'No hay Productos con el ID:' + id
        });
    }
    res.json({
        product
    });
});
exports.getProductsById = getProductsById;
const postProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _b = req.body, { state, user } = _b, body = __rest(_b, ["state", "user"]);
    const productDB = yield product_1.default.findOne({ name: body.name.toUpperCase() });
    if (productDB) {
        res.status(400).json({
            msg: `La categoria ${body.name} ya existe en la BD`
        });
    }
    //Generar la data a guardar
    const data = Object.assign(Object.assign({}, body), { name: body.name.toUpperCase(), user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    const product = new product_1.default(data);
    //Guardar en DB
    yield product.save();
    res.status(201).json(product);
});
exports.postProducts = postProducts;
const putProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _c = req.body, { state, user } = _c, data = __rest(_c, ["state", "user"]);
    let product = yield product_1.default.findById(id);
    if ((product === null || product === void 0 ? void 0 : product.state) === false) {
        return res.status(400).json({
            msg: 'No existe una categoria con ese ID'
        });
    }
    ;
    data.name = data.name.toUpperCase();
    const nameProduct = yield product_1.default.findOne({ name: data.name });
    if (nameProduct) {
        return res.status(400).json({
            msg: `La categoria ${data.name} ya existe en la BD`
        });
    }
    product = yield product_1.default.findByIdAndUpdate(id, data, { new: true }).populate('user', 'name')
        .populate('category', 'name');
    res.status(202).json({
        product
    });
});
exports.putProducts = putProducts;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findByIdAndUpdate(id, { state: false }).populate('user', 'name');
    if ((product === null || product === void 0 ? void 0 : product.state) === false) {
        return res.status(400).json({
            msg: 'No existe una categoria con ese ID'
        });
    }
    ;
    res.json({
        product
    });
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.js.map