import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  // Transforma o valor da chunck e o passa a frente
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    // mathod 1 -> return um new Error() caso haja
    callback(null, Buffer.from(String(transformed)))
  }
}

// Req -> ReadableStream
// Res -> WritableStream
const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunck of req) {
    buffers.push(chunck)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()
  
  console.log(fullStreamContent)

  return res.end(fullStreamContent)

  // return req
  //   .pipe(new InverseNumberStream())
  //   .pipe(res)
})

// exemplo quando temos que esperar executar toda stream
// const server = http.createServer(async (req, res) => {
//   const buffers = []

//   for await (const chunck of req) {
//     buffers.push(chunck)
//   }

//   const fullStreamContent = Buffer.concat(buffers).toString()
  
//   console.log(fullStreamContent)

//   return res.end(fullStreamContent)
// })

server.listen(3334)