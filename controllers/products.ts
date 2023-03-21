import { Request, Response } from 'express';
import Product from '../models/product';

export const getProducts = async (req:Request, res:Response) => {

  const { limit=5 } = req.query;
  const query = { state: true };

  const  [total, product] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).limit(+limit).populate('user','name').populate('category', 'name')
  ]);

  return res.json({
    total,
    product
  });
}

export const getProductsById = async (req:Request, res:Response) => {
  const { id } = req.params;
  const query = { state: true };
  const product = await Product.findById(id).find(query)
                                .populate('user','name').populate('category','name');
  
  if ( product.length === 0 ){
    return res.json({
      msg: 'No hay Productos con el ID:'+ id
    });
  }

  return res.json({
    product
  });
}

export const postProducts = async (req:Request, res:Response) => {
 
  const { state, user, ...body }= req.body;

  const productDB = await Product.findOne({name:body.name.toUpperCase()});
  if( productDB ){
    return res.status(400).json({
      msg: `La categoria ${body.name} ya existe en la BD`
    })
  }

  //Generar la data a guardar
  const data ={
    ...body,
    name: body.name.toUpperCase(),
    user: req.user?._id,
  }

  const product = new Product(data)
  //Guardar en DB
  await product.save()

  return res.status(201).json(product);
}

export const putProducts = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { state, user, ...data } =  req.body;

  let product = await Product.findById(id);

  if ( product?.state === false ){
    return res.status(400).json({
      msg: 'No existe una categoria con ese ID'
    });
  };
  
  data.name = data.name.toUpperCase();

  const nameProduct = await Product.findOne({name: data.name});

  if ( nameProduct  ){
    return res.status(400).json({
      msg: `La categoria ${data.name} ya existe en la BD`
    });
  }

  product = await Product.findByIdAndUpdate(id, data, {new: true}).populate('user','name')
                          .populate('category','name');

  return res.status(202).json({
    product
  });

};

export const deleteProduct = async (req:Request, res:Response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { state: false }).populate('user','name');

  if ( product?.state === false ){
    return res.status(400).json({
      msg: 'No existe una categoria con ese ID'
    });
  };

  return res.json({
    product
  });
}