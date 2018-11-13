const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy([
    '/api',
    '/auth/callback',
    '/api/visited/:id',
    '/api/visited/:id',
    '/api/saveforlater/:id'


    ],{ target: 'http://localhost:4000/' }));
};