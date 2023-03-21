import { Response, Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';

import path from 'path';
import fs from 'fs';

import { validateFileUpload } from '../helpers';
import Product from '../models/product';
import User from '../models/user';

cloudinary.config( !process.env.CLOUDINARY_URL );

export const getImage = async(req:Request, res:Response) =>{
  const { collection, id }= req.params;
  let model: any;

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if(!model){
        return res.status(400).json({
          msg: `No existe un usario con el id ${id}`
        });
      }

      break;

    case 'products':
      model = await Product.findById(id)
      if(!model){
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        });
      }
      break;
  
    default:
      return res.status(500).json({msg: 'Validacion omitida, infomar al admin DB'})
  }

  if( model.img){
    const pathImage = path.join( __dirname, '../uploads/', collection, model.img );
    if( fs.existsSync(pathImage) ){
      return res.sendFile( pathImage);
    }
  }
  
  const noImage = path.join( __dirname, '../assets/no-image.jpg');
  return res.sendFile( noImage );
};


export const fileUpload = async(req:Request, res:Response) => {
  const file  = req.files?.file as UploadedFile;

  try {
    const name_file = await validateFileUpload(file, undefined, 'images');
    res.json({
      name_file
    })

  } catch (error) {
    res.status(400).json({
      error
    })
  }
};


export const updateImageCloudinay = async(req:Request, res:Response)=>{
 
  const file  = req.files?.file as UploadedFile;

  const { collection, id }= req.params;
  let model: any;

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if(!model){
        return res.status(400).json({
          msg: `No existe un usario con el id ${id}`
        });
      }

      break;

    case 'products':
      model = await Product.findById(id)
      if(!model){
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        });
      }
      break;
  
    default:
      return res.status(500).json({msg: 'Validacion omitida, infomar al admin DB'})
  }

  //limpiar imagen previas en cloudinary
  if( model.img){
    const nameArr = model.img.split('/');
    const name = nameArr[ nameArr.length - 1];
    const [ public_id ] = name.split('.');
    cloudinary.uploader.destroy(public_id);
  }

  const {secure_url} = await cloudinary.uploader.upload( file.tempFilePath )
  model.img = secure_url;

  await model.save(); 

  res.json(model);
};

export const updateImage = async(req:Request, res:Response)=>{
 
  const file  = req.files?.file as UploadedFile;

  const { collection, id }= req.params;
  let model: any;

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if(!model){
        return res.status(400).json({
          msg: `No existe un usario con el id ${id}`
        });
      }

      break;

    case 'products':
      model = await Product.findById(id)
      if(!model){
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        });
      }
      break;
  
    default:
      return res.status(500).json({msg: 'Validacion omitida, infomar al admin DB'})
  }

  //limpiar imagen previas
  if( model.img){
    // Borrar la imagen del servidor
    const pathImage = path.join( __dirname, '../uploads/', collection, model.img );
    if( fs.existsSync(pathImage) ){
      fs.unlinkSync(pathImage);
    }
  }

  const imagen = await validateFileUpload(file, undefined, collection);
  model.img = imagen;

  model.save();

  res.json({model});
}