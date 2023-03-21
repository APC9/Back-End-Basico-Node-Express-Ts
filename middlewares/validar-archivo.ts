import { Request, Response } from 'express';

export const validatefile = (req:Request, res:Response, next: ()=>void ) =>{
  if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
    return res.status(400).json({ msg:'No se adjunto ningun archivo' });
  }

  next();
}