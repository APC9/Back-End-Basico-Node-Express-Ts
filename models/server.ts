import express, {Application} from 'express';
import cors from 'cors';

import router from '../routes/users';

class Server{
  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/users'
  }

  constructor(){
    this.app = express();
    this.port = process.env.PORT || '8080';
    this.middlewares();
    
    //Rutas de mi aplicacion
    this.routes();
  }

  middlewares(){
    //CORS
    this.app.use( cors() );

    //lectura y parseo del body
    this.app.use( express.json() );

    //Directorio publico
    this.app.use( express.static('public'));
  }
  
  routes(){
    this.app.use( this.apiPaths.users, router );
  }
  
  listen(){
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

}

export default Server;