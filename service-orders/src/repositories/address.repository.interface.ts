import type { Address } from '@/entities/address.entity'

export interface IAddressRepository {
  findAddressByPersonId(
    personId: number,
    page: number,
    limit: number,
  ): Promise<Address[]>

  create(address: Address): Promise<Address | undefined>
}
