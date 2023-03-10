import { Schema, model} from 'mongoose';

interface Role{
  role: string;
}

const roleSchema = new Schema<Role>({
  role: { type: String, required: [true, 'El rol es requerido'] },
});

export default model<Role>('Role', roleSchema);