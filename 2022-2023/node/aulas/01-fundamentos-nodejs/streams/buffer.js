// Buffer e uma representacao de um espaco na memoria do computador
// usado para transitar dados de uma maneira muito rapida

// apenas 'buf' o retorno e em hexadecimal, 'buf.toJSON()' o retorno e em decimal
const buf = Buffer.from('Ok')

console.log(buf.toJSON())