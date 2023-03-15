import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';

import User from '../models/user';
import generarJWT from '../helpers/generarJWT';

export const login = async (req:Request, res:Response) => {

  const { email, password }=req.body;

  try {
    
    // Verificar si el email existe
    const user = await User.findOne({email}); 
    if (!user){
      return  res.status(400).json({
        msg: 'Usuario / Password no son correctos - Correo'
      });
    }

    //Verificar si el usuario esta activo
    if (!user.state ){
      return  res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado: false'
      });
    }

    //Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password)
     if (!validPassword ){
      return  res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      });
    }

    //Generar JWT
    const token = await generarJWT( user.id )

    res.json({
      user,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
    msg: 'Hable con el administrador de la BD'
   })
  }

}
