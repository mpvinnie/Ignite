// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    foods: {
      id: string
      session_id?: string
      name: string
      description: string
      date: string
      within_diet: boolean
      created_at: string
    }
  }
}
