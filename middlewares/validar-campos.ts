import { Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';


export const validarCampos = (req:Request, res:Response, next: ()=>void ) =>{
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors});
  }

  next();
}

