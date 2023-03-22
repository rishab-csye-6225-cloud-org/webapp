const client = require("./statsd.js");
const logger = require("./logger.js");
const statsDMiddleware = (req, res, next) => {
     if(req.baseUrl !== "" || req.route !== undefined){
        client.increment(`${req.method} ${req.baseUrl}${req.route.path}`);
        logger.info("The count is : " + req.method);
     }
    next();
  };


module.exports = statsDMiddleware;