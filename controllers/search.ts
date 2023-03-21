import { Request, Response } from 'express';
import { searchUser, searchCategory, searchProduct } from '../helpers';


const collectionsAllowed =[
  'category',
  'product',
  'role',
  'user' 
]


export const search =  (req: Request, res: Response) => {
  const { collection, term  }=req.params;

  if(!collectionsAllowed.includes(collection) ){
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${collectionsAllowed.join(' ') }`
    })
  }

  switch (collection){
    case 'category':
      searchCategory(term, res);

    break;
    case 'product':
      searchProduct(term, res);

    break;

    case 'user':
      searchUser(term, res);

    break;

    default:
      return res.status(500).json({
        msg: 'Busqueda omitida, informar al administrador de BD'
      })
  } 
};
