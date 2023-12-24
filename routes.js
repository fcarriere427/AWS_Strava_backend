import express from 'express'

import bonjourRouter from '../routes/bonjour'
import aurevoirRouter from '../routes/aurevoir'

function routes(app) {
  app.use("/bonjour", bonjourRouter);
  app.use("/aurevoir", aurevoirRouter);
};

export default routes;