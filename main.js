// const jsonServer = require('json-server')
import jsonServer from 'json-server'
import queryString from 'query-string'
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updateAt = Date.now();
  }
  else if (req.method === 'PATCH') {
    req.body.updateAt = Date.now();
  }
  // Continue to JSON Server router
  next()
})

router.render = (req, res) => {

  const param = queryString.parse(req._parsedUrl.query)
  // console.log("LOG ~ file: main.js:34 ~ param:", param)
  const headers = res.getHeaders()
  const totalCountHeader = headers['x-total-count']
  if (req.method === 'GET' && totalCountHeader) {
    const result = {
      data: res.locals.data,
      pagination:{
        page: Number.parseInt(param._page),
        limit: Number.parseInt(param._limit),
        total_count: totalCountHeader
      }
    }

    return res.jsonp(result)
  }
  res.jsonp(res.locals.data)
}


// Use default router
server.use(router)
server.listen(3030, () => {
  console.log('JSON Server is running')
})