import { Response } from 'express'; 
import { isValidObjectId } from 'mongoose';

import Product from '../models/product';

export const searchProduct = async( term: string = '', res: Response)=>{
  const isMongoID = isValidObjectId(term);
  if(isMongoID){
    const product = await Product.findById(term).populate('user', 'name').populate('category', 'name');
    return res.json({
      results:(product)? [product]:[]
    })
  }

  const regex = new RegExp(term, 'i') // termino insencible a mayuscula a miniscula
  const product = await Product.find({
    $or: [{name: regex}],
    $and: [{state: true}]
  }).populate('user', 'name').populate('category', 'name');

  res.json({
    results: product
  })

}
