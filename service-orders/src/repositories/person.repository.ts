import { Person } from '@/entities/person.entity'

export class PersonRepository {
  async findById(id: number): Promise<Person> {
    return {
      id,
      cpf: '123456789',
      name: 'Felipe Galobart',
      birth: new Date('1989-06-16'),
      email: 'felipe@mitsuwa.com.br',
      user_id: 1,
    }
  }

  async create(person: Person): Promise<Person> {
    return person
  }
}
