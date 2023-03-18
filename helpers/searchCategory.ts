import { Response } from 'express'; 
import { isValidObjectId } from 'mongoose';

import Category from '../models/category';

export const searchCategory = async( term: string = '', res: Response)=>{
  const isMongoID = isValidObjectId(term);
  if(isMongoID){
    const category = await Category.findById(term).populate('user', 'name');
    return res.json({
      results:(category)? [category]:[]
    })
  }

  const regex = new RegExp(term, 'i') // termino insencible a mayuscula a miniscula
  const category = await Category.find({
    $or: [{name: regex}],
    $and: [{state: true}]
  }).populate('user', 'name');

  res.json({
    results: category ? [category] : []
  })

}
