import { Request, Response } from 'express';

export const isAdminRole = (req:Request, res:Response, next: ()=>void ) =>{
  const user = req.user;
  if ( !user ){
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar el token'
    })
  }

  if ( user?.role !== 'ADMIN_ROLE'){
    return res.status(400).json({
      msg: `El usuario: ${user.name}, no tiene rol de administrador`
    })
  }
  next();
};

export const hasRole = ( ...roles:string[] ) =>{
  return (req:Request, res:Response, next: ()=>void ) =>{
    if( !req.user ){
      return res.status(500).json({
        msg: 'Se quiere verificar el rol sin validar el token'
      })
    }

    if(!roles.includes( req.user?.role )){
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`
      })
    }
    next();
  }
}