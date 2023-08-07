import { Entity } from '../../core/entity'

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {}
