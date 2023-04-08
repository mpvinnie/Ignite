import { app } from './app'

app.listen({
  host: '0.0.0.0',
  port: 3333
}).then(() => {
  console.log('🚀 Http Server Running on http://0.0.0.0:3333')
})