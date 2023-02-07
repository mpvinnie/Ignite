import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { AppError } from './error.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title || !description) {
        throw new AppError('Title and Description are required fields')
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }

      database.insert('tasks', task)

      return res.writeHead(201).end(JSON.stringify(task))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const { title, description } = req.body

      if (!id || !title || !description) {
        throw new AppError("'id', 'title' and 'description' are required fields")
      }

      const tasksFound = database.select('tasks', {
        id
      })

      if (tasksFound.length === 0) {
        throw new AppError('Task not found', 404)
      }

      const task = tasksFound[0]

      database.update('tasks', id, {
        ...task,
        title,
        description,
        updated_at: new Date()
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      if (!id) {
        throw new AppError("'id' is a required field")
      }

      const tasksFound = database.select('tasks', {
        id
      })

      if (tasksFound.length === 0) {
        throw new AppError('Task not found', 404)
      }

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      if (!id) {
        throw new AppError("'id' is a required field")
      }

      const tasksFound = database.select('tasks', {
        id
      })

      if (tasksFound.length === 0) {
        throw new AppError('Task not found', 404)
      }

      const task = tasksFound[0]

      database.update('tasks', id, {
        ...task,
        completed_at: new Date(),
        updated_at: new Date(),
      })

      return res.writeHead(204).end()
    }
  }
]