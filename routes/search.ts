import { Router } from 'express';
import { search } from '../controllers/search';

export const routerSearch: Router = Router();

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
routerSearch.get('/:collection/:term', search);