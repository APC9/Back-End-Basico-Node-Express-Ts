import jwt from 'jsonwebtoken';

const generarJWT = ( uid:string ) =>{

  return new Promise( (resolve, reject )=>{
    const payload = {uid};

    jwt.sign(payload, process.env.SECRETORPRIVATEKEY!, {
      expiresIn: '31d'
    }, (err, token)=>{

      if (err){
        console.log(err)
        reject('No se pudo generar el Token')
      }else{
        resolve(token)
      }
    });

  });
};

export default generarJWT;