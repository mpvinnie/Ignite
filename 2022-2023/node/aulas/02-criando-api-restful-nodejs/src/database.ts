import { knex as setupNext } from 'knex'

export const knex = setupNext({
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
})
