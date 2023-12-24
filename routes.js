import express from 'express'

import bonjourRouter from './routes/bonjour.js'
import aurevoirRouter from './routes/aurevoir.js'
import readDBRouter from './routes/readDB.js'


function routes(app) {
  app.use("/bonjour", bonjourRouter);
  app.use("/aurevoir", aurevoirRouter);
  app.use("/readDB", readDBRouter);
};

export default routes;