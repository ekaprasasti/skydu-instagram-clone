const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use((req, res, next) => {
  next()
})

server.post('/login', (req, res) => {
  res.jsonp(req.query)
})

server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})