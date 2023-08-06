export type Age = 'PUPPY' | 'YOUNG_ADULT' | 'MATURE_ADULT' | 'SENIOR'

export type Size = 'SMALL' | 'MEDIUM' | 'LARGE' | 'GIANT'

export type Energy = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH'

export type Independency = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH'

export type Environment =
  | 'SPACIOUS'
  | 'COMPACT'
  | 'OPEN'
  | 'LIMITED_SPACE'
  | 'EXPANSIVE'
  | 'CRAMPED'

export interface CreatePetDTO {
  org_id: string
  name: string
  about: string
  age: Age
  size: Size
  energy_level: Energy
  independency_level: Independency
  environment: Environment
  images: string[]
  adoption_requirements: string[]
}

export interface FindManyUnadoptedByCityDTO {
  city: string
  age?: Age
  size?: Size
  energy_level?: Energy
  independency_level?: Independency
  environment?: Environment
}
