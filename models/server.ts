import express, {Application} from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerSetup from "../docs/swagger";

import dbConection from '../db/config';
import { routerAuth, routerUser, routerCategories, routerSearch } from '../routes';
import { routerProducts } from '../routes/products';


class Server{
  private app: Application;
  private port: string;
  private paths = {
    auth: '/api/auth',
    categories: '/api/categories',
    documentation: '/documentation',
    products: '/api/products',
    search: '/api/search',
    users: '/api/users'
  };

  constructor(){
    this.app = express();
    this.port = process.env.PORT || '8080';

    //Conectar a BD
    this.conectarDB();

    //middlewares
    this.middlewares();
    
    //Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB(){
    await dbConection()
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
    this.app.use( this.paths.auth, routerAuth );
    this.app.use( this.paths.categories, routerCategories );
    this.app.use( this.paths.documentation, swaggerUi.serve, swaggerUi.setup(swaggerSetup));
    this.app.use( this.paths.products, routerProducts );
    this.app.use( this.paths.search, routerSearch );
    this.app.use( this.paths.users, routerUser );
  }
  
  listen(){
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

}

export default Server;