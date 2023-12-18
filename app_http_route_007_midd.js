const http = require('http');
const url = require('url');
const querystring = require('querystring');

class Router {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      DELETE: {}
    };

    this.middlewares = [];
  }

  get(path, handler) {
    this.routes.GET[path] = handler;
  }

  post(path, handler) {
    this.routes.POST[path] = handler;
  }

  put(path, handler) {
    this.routes.PUT[path] = handler;
  }

  delete(path, handler) {
    this.routes.DELETE[path] = handler;
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  handleRequest(request, response) {
    const parsedUrl = url.parse(request.url);
    const queryParams = querystring.parse(parsedUrl.query);
    const method = request.method;
    const path = parsedUrl.pathname;

    const routeHandler = this.routes[method] && this.routes[method][path];
    if (routeHandler) {
      const executeMiddlewares = (middlewares, idx) => {
        if (idx < middlewares.length) {
          const currentMiddleware = middlewares[idx];
          console.info(currentMiddleware, idx)
          currentMiddleware(request, response, () => {
           console.info("next", idx)
            executeMiddlewares(middlewares, idx + 1);
          });
        } else {
          // Tous les middlewares ont été exécutés, exécution du route handler
          this.executeRouteHandler(request, response, routeHandler, queryParams);
        }
      };

      // Exécution des middlewares avant le route handler
      console.info(this.middlewares.length)
      executeMiddlewares(this.middlewares, 0);
    } else {
      createResponse(response).status(404).send('Route non trouvée ou méthode non autorisée');
    }
  }

  executeRouteHandler(request, response, routeHandler, queryParams) {
    let body = '';
    if (request.method === 'POST' || request.method === 'PUT') {
      request.on('data', (chunk) => {
        body += chunk.toString();
      });

      request.on('end', () => {
        const postData = querystring.parse(body);
        routeHandler(request, createResponse(response), postData);
      });
    } else {
      routeHandler(request, createResponse(response), queryParams);
    }
  }
}

function createResponse(response) {
  return {
    header: (key, value) => {
      response.setHeader(key, value);
    },
    json: (data) => {
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(data));
    },
    status: (statusCode) => {
      response.statusCode = statusCode;
      return createResponse(response);
    },
    send: (text) => {
      response.end(text);
    }
  };
}

const router = new Router();

const myMiddleware1 = (request, response, next) => {
  next()
}

const myMiddleware2 = (request, response, next) => {
  next()
}

const myMiddleware3 = (request, response, next) => {
  next()
}

// Ajout du middleware
router.use(myMiddleware1);
router.use(myMiddleware2);
router.use(myMiddleware3);

router.get('/api/data', (request, response, queryParams) => {
  const jsonData = {
    message: 'Ceci est une réponse GET depuis /api/data',
    queryParams: queryParams
  };
  response.header('Custom-Header', 'Value');
  response.json(jsonData);
});

router.post('/api/data', (request, response, postData) => {
  const jsonData = {
    message: 'Ceci est une réponse POST depuis /api/data',
    postData: postData
  };
  response.json(jsonData);
});

router.put('/api/data', (request, response, putData) => {
  const jsonData = {
    message: 'Ceci est une réponse PUT depuis /api/data',
    putData: putData
  };
  response.status(200).json(jsonData);
});

router.delete('/api/data', (request, response) => {
  const jsonData = {
    message: 'Ceci est une réponse DELETE depuis /api/data'
  };
  response.status(200).json(jsonData);
});

// Création du serveur avec le router
const server = http.createServer((request, response) => {
  router.handleRequest(request, response);
});

server.listen(80, (err) => {
  if (err) {
    return console.error('Erreur: ', err);
  }
  console.log('Le serveur est en cours d\'écoute sur le port 80');
});
