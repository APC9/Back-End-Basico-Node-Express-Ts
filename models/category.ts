import { Schema, model} from 'mongoose';

interface Category{
  name: string;
  state: boolean;
  user: Schema.Types.ObjectId
}

const categorySchema = new Schema<Category>({
  name: { type: String, required: [true, 'El nombre es requerido'], unique: true },
  state: { type: Boolean, default: true, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

categorySchema.methods.toJSON = function() {
  const { __v, _id, ...rest } = this.toObject();
  rest.uid = _id;
  return rest;
}


export default model<Category>('Category', categorySchema);