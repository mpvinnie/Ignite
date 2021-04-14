import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import ICompareInHoursDTO from '../dtos/ICompareInHoursDTO'
import IDateProvider from '../models/IDateProvider'

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {
  compareInHours({ start_date, end_date }: ICompareInHoursDTO): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)

    return dayjs(end_date_utc).diff(start_date_utc, 'hours')
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  dateNow(): Date {
    return dayjs().toDate()
  }
}

export default DayjsDateProvider
