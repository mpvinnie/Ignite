export class Cpf {
  private value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(cpf: string) {
    if (!this.isValid(cpf)) {
      throw new Error('Invalid CPF.')
    }

    return new Cpf(cpf)
  }

  static generate() {
    const cpfArray = Array.from({ length: 9 }, () =>
      Math.floor(Math.random() * 10)
    )
    const cpfBase = cpfArray.join('')
    const digit1 = Cpf.calculateCpfDigit(cpfBase)
    const digit2 = Cpf.calculateCpfDigit(cpfBase + digit1.toString())

    const validCpf = cpfBase + digit1.toString() + digit2.toString()

    return new Cpf(validCpf)
  }

  private static isValid(cpf: string) {
    if (!cpf || cpf.length !== 11) {
      return false
    }

    cpf = cpf.replace(/[^\d]/g, '')

    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false
    }

    let sum = 0
    let remainder = 0

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.charAt(i - 1)) * (11 - i)
    }

    remainder = (sum * 10) % 11

    if (remainder === 10 || remainder === 11) {
      remainder = 0
    }

    if (remainder !== parseInt(cpf.charAt(9))) {
      return false
    }

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.charAt(i - 1)) * (12 - i)
    }

    remainder = (sum * 10) % 11

    if (remainder === 10 || remainder === 11) {
      remainder = 0
    }

    if (remainder !== parseInt(cpf.charAt(10))) {
      return false
    }

    return true
  }

  private static calculateCpfDigit(base: string): number {
    let sum = 0
    for (let i = 0; i < base.length; i++) {
      sum += parseInt(base[i]) * (base.length + 1 - i)
    }

    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  toString() {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  toValue() {
    return this.value
  }
}
