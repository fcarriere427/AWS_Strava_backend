import express from 'express'

import bonjourRouter from './routes/bonjour.js'
import aurevoirRouter from './routes/aurevoir.js'

function routes(app) {
  app.use("/bonjour", bonjourRouter);
  app.use("/aurevoir", aurevoirRouter);
};

export default routes;