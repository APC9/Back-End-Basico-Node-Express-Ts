"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const helpers_1 = require("../helpers");
const collectionsAllowed = [
    'category',
    'product',
    'role',
    'user'
];
const search = (req, res) => {
    const { collection, term } = req.params;
    if (!collectionsAllowed.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${collectionsAllowed.join(' ')}`
        });
    }
    switch (collection) {
        case 'category':
            (0, helpers_1.searchCategory)(term, res);
            break;
        case 'product':
            (0, helpers_1.searchProduct)(term, res);
            break;
        case 'user':
            (0, helpers_1.searchUser)(term, res);
            break;
        default:
            res.status(500).json({
                msg: 'Busqueda omitida, informar al administrador de BD'
            });
    }
};
exports.search = search;
//# sourceMappingURL=search.js.map