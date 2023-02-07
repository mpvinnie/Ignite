import http from 'node:http'
import { AppError } from './error.js'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
  try {
    const { method, url } = req
    
    await json(req, res)
    
    const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })
  
  if (route) {
    const routeParams = req.url.match(route.path)
    
    const { query, ...params } = routeParams.groups
    
    req.params = params
    req.query = query ? extractQueryParams(query) : {} 
    
    return route.handler(req, res)
  }
  
  return res.writeHead(404).end()
  } catch (err) {
    if (err instanceof AppError) {
      return res.writeHead(err.statusCode).end(JSON.stringify({
        statusCode: err.statusCode,
        message: err.message
      }))
    }
    
    console.log(err)
  }
})

server.listen(3333)