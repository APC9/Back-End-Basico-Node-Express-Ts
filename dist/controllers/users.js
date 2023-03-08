"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUsers = exports.deleteUSers = exports.postUsers = exports.putUsers = exports.getUsers = void 0;
const getUsers = (req, res) => {
    const quey = req.query;
    res.json(Object.assign({ msg: 'get API - controllers - controllers' }, quey));
};
exports.getUsers = getUsers;
const putUsers = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'put API - controllers',
        id
    });
};
exports.putUsers = putUsers;
const postUsers = (req, res) => {
    const body = req.body;
    const { name, email } = req.body;
    res.status(201).json({
        msg: 'post API - controllers',
        name,
        email,
        data: Object.assign({}, body)
    });
};
exports.postUsers = postUsers;
const deleteUSers = (req, res) => {
    res.json({
        msg: 'delete API - controllers'
    });
};
exports.deleteUSers = deleteUSers;
const patchUsers = (req, res) => {
    res.json({
        msg: 'patch API - controllers'
    });
};
exports.patchUsers = patchUsers;
//# sourceMappingURL=users.js.map