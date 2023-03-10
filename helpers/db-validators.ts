import Role from '../models/role';
import User from '../models/user';

export const isValidRole = async ( role:string = '' ) => { 
  const existsRole = await Role.findOne({ role });
  if ( !existsRole ) {
    throw new Error (`El rol ${role} no esta registrado en la BD`);
  }
}

export const existsEmail = async ( email:string ) => {
  const existsEmail = await User.findOne({ email });
  if ( existsEmail ) {
    throw new Error (`El email ${email} ya esta registrado en la BD`);
  };
};

export const existsUserById = async ( id:string ) => {
  const existsUser = await User.findById(id);
  if ( !existsUser ) {
    throw new Error (`El usuario con el id: ${id} no existe en la BD`);
  };
};