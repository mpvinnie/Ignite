import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  // método obrigatório que retorna os dados da stream
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        const buff = Buffer.from(String(i))
  
        this.push(buff)
      }
    }, 1000)
  }
}

// Temos que usar uma POST Request quando queremos enviar dados para uma stream
// Podemos passar uma stream diretamente no body da requisicao POST
fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
})