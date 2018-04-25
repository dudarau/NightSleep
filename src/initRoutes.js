const ACTION_HEADER = 'x-night-sleep';
const ACTION_HEADER_VALUE = 'x-night-sleep-value';
const ERROR_STATUS = 501;
const defaultTimeout = 1000;

const initRoute = (app, logger, routeConfig) => {
    switch(routeConfig.method) {
      case 'GET':
        app.get(routeConfig.url, routeHandler(logger, routeConfig));
        break;
      case 'POST':
        app.post(routeConfig.url, routeHandler(logger, routeConfig));
        break;
      case 'PUT':
        app.put(routeConfig.url, routeHandler(logger, routeConfig));
        break;
      case 'HEAD':
        app.head(routeConfig.url, routeHandler(logger, routeConfig));
        break;
      case 'DELETE':
        app.delete(routeConfig.url, routeHandler(logger, routeConfig));
        break;
      default:
        break;
    }
  };

const isParamsValid = (params, configParams) => {
  if (configParams) {
    for(let key in configParams) {
      if (params[key] !== configParams[key] &&
        configParams[key].indexOf(params[key]) < 0) {
        return false;
      }
    }
  }
  return true;
};

const isAllParamsValid = (req, routeConfig) => {
  return isParamsValid(req.params, routeConfig.params) &&
    isParamsValid(req.query, routeConfig.queryParams) &&
    isParamsValid(req.body, routeConfig.bodyParams);
};

const isConfiguredByHeaders = (req, res, logger, routeConfig) => {
  const action = req.get(ACTION_HEADER);
  const actionValue = req.get(ACTION_HEADER_VALUE);
  logger.info(req.method, req.path, ' - ',  action, ' - ', actionValue);
  if (action) {
    if (action === 'timeout') {
      setTimeout(() => {
        res.sendStatus(routeConfig.status);
      }, actionValue || defaultTimeout);
      return true;
    }
    if (action === 'server-error') {
      res.sendStatus(ERROR_STATUS);
      return true;
    }
  }

  return false;
};

const routeHandler = (logger, routeConfig) => {
  return (req, res, next) => {
    logger.info(req.method, req.path);
    if (!isAllParamsValid(req, routeConfig)) {
      return next();
    }
    if (!isConfiguredByHeaders(req, res, logger, routeConfig)) {
      res.status(routeConfig.status).send(routeConfig.body);
    }
  };
};

module.exports = {
  initRoute,
};