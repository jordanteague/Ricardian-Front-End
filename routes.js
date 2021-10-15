const routes = require("next-routes")();

routes
  .add("/llcs/edit/[id]", "/llcs/edit/index");

module.exports = routes;
