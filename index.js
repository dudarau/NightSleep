const router = require('./src/initRoutes');

module.exports = {
    initRoutes: (app, logger, config) => {
        const routes = config.routes;
        if (!routes) {
            return;
        }
        for(let i = 0; i < routes.length; i++) {
            router.initRoute(app, logger, routes[i])
        }

        app.all('*', (req,res) => {
           logger.log('all');
           res.sendStatus(502);
        });
    }
};