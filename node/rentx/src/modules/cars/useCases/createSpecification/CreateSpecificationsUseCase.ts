import { inject, injectable } from 'tsyringe'

import AppError from '../../../../errors/AppError'
import ICreateSpecficationDTO from '../../dtos/ICreateSpecificationDTO'
import ISpecificationsRepository from '../../repositories/ISpecificationsRepository'

@injectable()
class CreateSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: ICreateSpecficationDTO): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(
      name
    )

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists')
    }

    await this.specificationsRepository.create({
      name,
      description
    })
  }
}

export default CreateSpecificationsUseCase
