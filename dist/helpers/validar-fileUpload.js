"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileUpload = void 0;
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const extensions = ['png', 'jpg', 'jpeg', 'gif'];
const validateFileUpload = (file, validExtensions = extensions, folder = '') => {
    return new Promise((resolve, reject) => {
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];
        if (!validExtensions.includes(extension)) {
            return reject(`La extension ${extension} no es permitida, tipos ${validExtensions.join(' ')}`);
        }
        const nameTemp = (0, uuid_1.v4)() + '.' + extension;
        const uploadPath = path_1.default.join(__dirname, '../uploads/', folder, nameTemp);
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nameTemp);
        });
    });
};
exports.validateFileUpload = validateFileUpload;
//# sourceMappingURL=validar-fileUpload.js.map