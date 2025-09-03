import type { IAddressRepository } from '@/repositories/address.repository.interface'
import type { IAddress } from '@/entities/models/address.interface'
import type { IPerson } from '@/entities/models/person.interface'

export class FindAddressByPersonUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async handler(
    personId: number,
    page: number,
    limit: number,
  ): Promise<(IAddress & IPerson)[]> {
    return this.addressRepository.findAddressByPersonId(personId, page, limit)
  }
}
