"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerSearch = void 0;
const express_1 = require("express");
const search_1 = require("../controllers/search");
exports.routerSearch = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 * /api/search/{collections}/{term}:
 *    get:
 *      tags:
 *        - search
 *      summary: "Busqueda"
 *      description: Este End-point es hacer consulta a la BD
 *      operationId:
 *      parameters:
 *       - $ref: "#/components/parameters/collectionsParam"
 *       - $ref: "#/components/parameters/termParam"
 *      responses:
 *        '200':
 *          description: Retorna la busqueda solicitada.
 */
exports.routerSearch.get('/:collection/:term', search_1.search);
//# sourceMappingURL=search.js.map