import ICompareDTO from '../dtos/ICompareDTO'

export default interface IDateProvider {
  compareInHours(data: ICompareDTO): number
  compareInDays(data: ICompareDTO): number
  convertToUTC(date: Date): string
  dateNow(): Date
  addDays(days: number): Date
  addHours(hours: number): Date
  isBefore(data: ICompareDTO): boolean
}
