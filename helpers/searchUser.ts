import { Response } from 'express'; 
import { isValidObjectId } from 'mongoose';

import User from '../models/user';

export const searchUser = async( term: string = '', res: Response)=>{
  const isMongoID = isValidObjectId(term);
  if(isMongoID){
    const user = await User.findById(term);
    return res.json({
      results:(user)? [user]:[]
    })
  }

  const regex = new RegExp(term, 'i') // termino insencible a mayuscula a miniscula
  const user = await User.find({
    $or: [{name: regex},  {email: regex}],
    $and: [{state: true}]
  });

  res.json({
    results: user
  })

}
