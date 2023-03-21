import { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const extensions = ['png', 'jpg', 'jpeg', 'gif' ];

export const validateFileUpload = (
  file:UploadedFile, 
  validExtensions: string[]= extensions,
  folder: string= ''
  ) =>{

  return new Promise( (resolve, reject )=>{

    const cutName = file.name.split('.');
    const extension = cutName[ cutName.length - 1]
    
    if( !validExtensions.includes(extension) ){
      return reject(`La extension ${ extension } no es permitida, tipos ${validExtensions.join(' ')}` );
    }

    const nameTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join( __dirname, '../uploads/', folder, nameTemp);
  
    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
  
      resolve(nameTemp);
    }); 
    
  });

}