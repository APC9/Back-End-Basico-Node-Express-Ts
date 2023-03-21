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
exports.updateImage = exports.updateImageCloudinay = exports.fileUpload = exports.getImage = void 0;
const cloudinary_1 = require("cloudinary");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("../helpers");
const product_1 = __importDefault(require("../models/product"));
const user_1 = __importDefault(require("../models/user"));
cloudinary_1.v2.config(!process.env.CLOUDINARY_URL);
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = yield user_1.default.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usario con el id ${id}`
                });
            }
            break;
        case 'products':
            model = yield product_1.default.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Validacion omitida, infomar al admin DB' });
    }
    if (model.img) {
        const pathImage = path_1.default.join(__dirname, '../uploads/', collection, model.img);
        if (fs_1.default.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }
    const noImage = path_1.default.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(noImage);
});
exports.getImage = getImage;
const fileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
    try {
        const name_file = yield (0, helpers_1.validateFileUpload)(file, undefined, 'images');
        res.json({
            name_file
        });
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.fileUpload = fileUpload;
const updateImageCloudinay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const file = (_b = req.files) === null || _b === void 0 ? void 0 : _b.file;
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = yield user_1.default.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usario con el id ${id}`
                });
            }
            break;
        case 'products':
            model = yield product_1.default.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Validacion omitida, infomar al admin DB' });
    }
    //limpiar imagen previas en cloudinary
    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        cloudinary_1.v2.uploader.destroy(public_id);
    }
    const { secure_url } = yield cloudinary_1.v2.uploader.upload(file.tempFilePath);
    model.img = secure_url;
    yield model.save();
    res.json(model);
});
exports.updateImageCloudinay = updateImageCloudinay;
const updateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const file = (_c = req.files) === null || _c === void 0 ? void 0 : _c.file;
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = yield user_1.default.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usario con el id ${id}`
                });
            }
            break;
        case 'products':
            model = yield product_1.default.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Validacion omitida, infomar al admin DB' });
    }
    //limpiar imagen previas
    if (model.img) {
        // Borrar la imagen del servidor
        const pathImage = path_1.default.join(__dirname, '../uploads/', collection, model.img);
        if (fs_1.default.existsSync(pathImage)) {
            fs_1.default.unlinkSync(pathImage);
        }
    }
    const imagen = yield (0, helpers_1.validateFileUpload)(file, undefined, collection);
    model.img = imagen;
    model.save();
    res.json({ model });
});
exports.updateImage = updateImage;
//# sourceMappingURL=upLoads.js.map