import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface JwtPayload {
  uid: Record<string,any>
}


export const validarJWT = async (req:Request, res:Response, next: ()=>void ) =>{
  const token = req.header('x-token');

  if (!token){
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    });
  };

  try {
    
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY!) as JwtPayload
    
    //leer el usuario que corresponde al uid
    const user = await User.findById(uid); // el user de req.user viene de la capeta types archivo index
    if( !user ){
      return res.status(401).json({
        msg: 'Token no valido - usuario borrado DB'
      })
    }

  
    //verificar si el uid tiene el estado en falso
    if (user?.state === false ){
      return res.status(401).json({
        msg: 'Token no valido - usuario con estado en false'
      })
    }

    req.user = user;
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no valido'
    });    
  }


};

