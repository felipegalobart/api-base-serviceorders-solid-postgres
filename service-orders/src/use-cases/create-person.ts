import { Person } from '@/entities/person.entity'
import { PersonRepository } from '@/repositories/person.repository'

export class CreatePersonUseCase {
  constructor(private personRepository: PersonRepository) {}

  create(person: Person) {
    return this.personRepository.create(person)
  }
}
