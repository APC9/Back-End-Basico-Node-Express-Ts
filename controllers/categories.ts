import { Request, Response } from 'express';
import Category from '../models/category';

export const getCategories = async (req:Request, res:Response) => {

  const { limit=5 } = req.query;
  const query = { state: true };
  const  [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query).limit(+limit).populate('user','name')
  ]);

  return res.json({
    total,
    categories
  });
}

export const getCategoriesById = async (req:Request, res:Response) => {
  const { id } = req.params;
  const query = { state: true };
  const category = await Category.findById(id).find(query).populate('user','name');

  return res.json({
    category
  });
}

export const postCategories = async (req:Request, res:Response) => {

  const name  = req.body.name.toUpperCase();
  const categoryDB = await Category.findOne({name})

  if( categoryDB ){
    return res.status(400).json({
      msg: `La categoria ${ categoryDB.name } ya existe en la BD`
    })
  }

  //Generar la data a guardar
  const data ={
    name,
    user: req.user?._id
  }

  const category = new Category(data)
  //Guardar en DB
  await category.save()

  return res.status(201).json(category);
}

export const putCategories = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { state, user, ...data } =  req.body;

  let category = await Category.findById(id);

  if ( category?.state === false ){
    return res.status(400).json({
      msg: 'No existe una categoria con ese ID'
    });
  };
  
  data.name = data.name.toUpperCase();

  const nameCategory = await Category.findOne({name: data.name});

  if ( nameCategory  ){
    return res.status(400).json({
      msg: `La categoria ${data.name} ya existe en la BD`
    });
  };

  category = await Category.findByIdAndUpdate(id, data, {new: true}).populate('user','name');

  return res.status(202).json({
    category
  });
}

export const deleteCategories = async (req:Request, res:Response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, { state: false }).populate('user','name');

  if ( category?.state === false ){
    return res.status(400).json({
      msg: 'No existe una categoria con ese ID'
    });
  };

  return res.json({
    category
  });
}