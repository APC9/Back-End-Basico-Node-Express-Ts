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
exports.deleteUSers = exports.putUsers = exports.postUsers = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };
    const [total, users] = yield Promise.all([
        user_1.default.countDocuments(query),
        user_1.default.find(query)
            .skip(+from)
            .limit(+limit)
    ]);
    res.json({
        total,
        users
    });
});
exports.getUsers = getUsers;
const postUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    const user = new user_1.default({ name, email, password, role });
    //Encriptar la contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    user.password = bcryptjs_1.default.hashSync(password, salt);
    //Guardar en BD
    yield user.save();
    return res.status(201).json(user);
});
exports.postUsers = postUsers;
const putUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, password, google, email } = _a, rest = __rest(_a, ["_id", "password", "google", "email"]);
    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        rest.password = bcryptjs_1.default.hashSync(password, salt);
    }
    const user = yield user_1.default.findByIdAndUpdate(id, rest, { new: true });
    return res.status(200).json(user);
});
exports.putUsers = putUsers;
const deleteUSers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByIdAndUpdate(id, { state: false });
    if ((user === null || user === void 0 ? void 0 : user.state) === false) {
        return res.status(400).json({
            msg: 'No existe un usuario con ese ID'
        });
    }
    ;
    return res.json({
        user
    });
});
exports.deleteUSers = deleteUSers;
// Borrar fisicamente
//const user = await User.findByIdAndDelete(id);
//# sourceMappingURL=users.js.map