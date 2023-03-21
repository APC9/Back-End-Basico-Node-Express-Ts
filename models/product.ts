import { Schema, model} from 'mongoose';

interface Product{
  name: string;
  state: boolean;
  user: Schema.Types.ObjectId;
  price: number;
  category: Schema.Types.ObjectId;
  description: string;
  available: boolean,
  img: string
}

const productSchema = new Schema<Product>({
  name: { type: String, required: [true, 'El nombre es requerido'], unique: true },
  state: { type: Boolean, default: true, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, default: 0},
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String},
  available: { type: Boolean, default: true },
  img: { type: String}
});

productSchema.methods.toJSON = function() {
  const { __v, _id, ...rest } = this.toObject();
  rest.uid = _id;
  return rest;
}


export default model<Product>('Product', productSchema);