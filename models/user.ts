import { Schema, model } from 'mongoose';

interface User{
  name: string;
  email: string; 
  password: string;
  img: string;
  role: string;
  state: boolean;
  google: boolean
}

const userSchema = new Schema<User>({
  name: { type: String, required: [true, 'El nombre es requerido'] },
  email: { type: String, required: [true, 'El correo es requerido'] },
  password: { type: String, required: [true, 'La contraseña es requerida'] },
  img: { type: String },
  role: { type: String, default: 'USER_ROLE', required: true }, //enum: ['ADMIN_ROLE', 'USER_ROLE'] 
  state: { type: Boolean, default: true },
  google: { type: Boolean, default: false }
});

//retorna el usuario sin los parametros { __v, password } 
userSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
}

export default model<User>('User', userSchema);