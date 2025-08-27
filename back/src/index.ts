import server from './server';
// import express, { Router, Request, Response, Application } from 'express';
import { PORT } from './config/env';

import "reflect-metadata"
import { AppDataSource } from './config/data.source';
import { log } from 'console';

AppDataSource.initialize()
  .then(() => {
    
    console.log('Data Source has been initialized!');
    console.log('Database conection succesful');

    server.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });