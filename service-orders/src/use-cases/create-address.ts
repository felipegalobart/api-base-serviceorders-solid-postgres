import type { IAddress } from '@/entities/models/address.interface'
import type { IAddressRepository } from '@/repositories/address.repository.interface'

export class CreateAddressUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async handler(address: IAddress): Promise<IAddress | undefined> {
    return await this.addressRepository.create(address)
  }
}
