import { Request, Response } from 'express';

export const getUsers = (req:Request, res:Response) => {

  const quey = req.query;

  res.json({
    msg: 'get API - controllers - controllers',
    ...quey
  });
}

export const putUsers = (req:Request, res:Response) => {

  const id = req.params.id;

  res.json({
    msg: 'put API - controllers',
    id
  });
}

export const postUsers = (req:Request, res:Response) => {

  const body = req.body;
  const { name, email } = req.body;

  res.status(201).json({
    msg: 'post API - controllers',
    name,
    email,
    data: {...body}
  });
}

export const deleteUSers = (req:Request, res:Response) => {
  res.json({
    msg: 'delete API - controllers'
  });
}

export const patchUsers = (req:Request, res:Response) => {
  res.json({
    msg: 'patch API - controllers'
  });
}