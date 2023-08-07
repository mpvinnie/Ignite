import { Entity } from '../../core/entity'

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {}
