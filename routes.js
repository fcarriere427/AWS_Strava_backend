import express from 'express'

var bonjourRouter = require("../routes/bonjour");
var aurevoirRouter = require("../routes/aurevoir");

module.exports = function(app) {
  app.use("/bonjour", bonjourRouter);
  app.use("/aurevoir", aurevoirRouter);
};