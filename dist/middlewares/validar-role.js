"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRole = exports.isAdminRole = void 0;
const isAdminRole = (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        });
    }
    if ((user === null || user === void 0 ? void 0 : user.role) !== 'ADMIN_ROLE') {
        return res.status(400).json({
            msg: `El usuario: ${user.name}, no tiene rol de administrador`
        });
    }
    next();
};
exports.isAdminRole = isAdminRole;
const hasRole = (...roles) => {
    return (req, res, next) => {
        var _a;
        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            });
        }
        if (!roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    };
};
exports.hasRole = hasRole;
//# sourceMappingURL=validar-role.js.map