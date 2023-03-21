import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';

import User from '../models/user';
import generarJWT from '../helpers/generarJWT';
import { googleVerify } from '../helpers/google-verify';

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

    return res.json({
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

export const googleSignIn = async (req:Request, res:Response) => {
  const { id_token } = req.body;

  try {

    const { name, email, picture } = await googleVerify( id_token );
    let user = await User.findOne({email});

    if( !user ){
      // Si no existe el usuario, Creacion 
      const data = {
        name,
        email,
        picture,
        password: 'XD',
        google: true 
      }

      user = new User(data);
      await user.save();
    }

    //Si el usuario fue borrado de la BD
    if( !user.state ){
      return  res.status(400).json({
        msg: 'hable con  el administrador de la BD, usuario bloqueado'
      })
    }

    //Generear el JWT
    const token = await generarJWT( user.id )
    
    return res.json({
      user,
      token
    })

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'El token no se pudo verificar'
    })
  }
}