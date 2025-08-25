import server from './server';
// import express, { Router, Request, Response, Application } from 'express';
import { PORT } from './config/env';

import "reflect-metadata"
import { AppDataSource } from './config/data.source';

AppDataSource.initialize()
  .then(() => {
    
    console.log('Data Source has been initialized!');           //"Database conection succesful" cuando se genera la ruta

    server.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });