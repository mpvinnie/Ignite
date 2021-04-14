import ICompareInHoursDTO from '../dtos/ICompareInHoursDTO'

export default interface IDateProvider {
  compareInHours(data: ICompareInHoursDTO): number
  convertToUTC(date: Date): string
  dateNow(): Date
}
