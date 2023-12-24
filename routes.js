import express from 'express'

var bonjourRouter = require("../routes/bonjour");
var aurevoirRouter = require("../routes/aurevoir");

function routes(app) {
  app.use("/bonjour", bonjourRouter);
  app.use("/aurevoir", aurevoirRouter);
};

export default routes;