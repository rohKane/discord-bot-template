const api = require('lambda-api')();

api.register(require('./controllers/interactions'), { prefix: '/interactions' });
api.register(require('./controllers/commands'), { prefix: '/commands' });
api.register(require('./controllers/updateCommands'), { prefix: '/update-commands' });

exports.handler = async (event, context) => {
  return await api.run(event, context);
}
