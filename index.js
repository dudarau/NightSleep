const express = require('express');
const app = express();

module.exports = {
    runServer: (config) => {
        for(let i = 0; i < config.length; i++) {
            app.get(config[i].url, (req, res) => {
                if (config[i].status === 200) {
                    res.send(config[i].headerValue);
                }
            })
        }

        app.listen(3000, () => console.log('App listening on port 3000!'));
    }
};