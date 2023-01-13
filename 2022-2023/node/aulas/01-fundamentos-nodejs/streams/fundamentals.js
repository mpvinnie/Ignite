// Readable Streams -> Streams que são lidas aos poucos
// Writable Streams -> Streams que são enviadas aos poucos
 
// Com o Node (http), toda porta de entrada e saída é automaticamente uma stream (req, res)

// process.stdin -> Entrada do terminal (readable stream)
// pipe -> encaminha
// process.stdout -> Saída do terminal (writable stream)

// process.stdin.pipe(process.stdout)

import { Readable, Transform, Writable } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1

  // método obrigatório que retorna os dados da stream
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        // push() -> Metodo usado para uma readable stream fornecer fornecer informacoes
        // pra quem estiver consumindo ela
        // null -> Quer dizer que não tenho mais informações pra forcener
        this.push(null)
      } else {
        // Uma stream nao pode ser retornada como um tipo primitivo
        // Por isso criamos um buffer e o retornamos
        const buff = Buffer.from(String(i))
  
        this.push(buff)
      }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  // Transforma o valor da chunck e o passa a frente
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1

    // mathod 1 -> return um new Error() caso haja
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable {
  // chunck -> Pedaco que lemos da stream de leitura (this.push(buff))
  // encoding -> Como que a informacao ta codificada
  // callback -> Funcao que e chamada quando a funcao termina de fazer o que precisa fazer
  // uma stream de escrita apenas processa o dado (nao o retorna), nunca o transforma
  _write(chunck, encoding, callback) {
    console.log(Number(chunck.toString()) * 10)
    callback()
  }
}

// Leio os dados 'OneToHundredStream', transformo os dados e os passo a frente 'InverseNumberStream' e escrevo os dados em 'MultiplyByTenStream'
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())