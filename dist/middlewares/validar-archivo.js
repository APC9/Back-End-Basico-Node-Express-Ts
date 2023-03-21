"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatefile = void 0;
const validatefile = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({ msg: 'No se adjunto ningun archivo' });
    }
    next();
};
exports.validatefile = validatefile;
//# sourceMappingURL=validar-archivo.js.map