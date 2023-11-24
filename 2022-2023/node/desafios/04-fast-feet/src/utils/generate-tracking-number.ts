export function generateTrackingNumber() {
  const generateRandomDigits = (length: number): string => {
    let result = ''

    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10).toString()
    }

    return result
  }

  const generateRandomLetters = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)

      result += characters.charAt(randomIndex)
    }

    return result
  }

  const prefix = 'FF'
  const randomDigits = generateRandomDigits(10)
  const randomLetters = generateRandomLetters(2)

  return `${prefix}${randomDigits}${randomLetters}`
}
