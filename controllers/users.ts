import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import User from '../models/user';

export const getUsers = async (req:Request, res:Response) => {
  
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(+from)
      .limit( +limit )
  ]);

  res.json({
      total,
      users
    });
};


export const postUsers = async (req:Request, res:Response) => {

  const { name, email, password, role }= req.body;
  const user = new User({ name, email, password, role });
   
  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD
  await user.save();

  return res.status(201).json(user);
};


export const putUsers = async (req:Request, res:Response) => {

  const { id }= req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password){
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });
  return res.status(200).json(user);
}


export const deleteUSers = async (req:Request, res:Response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { state: false });

  if ( user?.state === false ){
    return res.status(400).json({
      msg: 'No existe un usuario con ese ID'
    });
  };

  return res.json({
    user
  });
}

// Borrar fisicamente
//const user = await User.findByIdAndDelete(id);
