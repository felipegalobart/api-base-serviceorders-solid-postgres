import type { Address } from '@/entities/address.entity'
import type { IAddressRepository } from '../address.repository.interface'
import type { Person } from '@/entities/person.entity'
import { database } from '@/lib/pg/db'

export class AddressRepository implements IAddressRepository {
  async findAddressByPersonId(
    personId: number,
    page: number,
    limit: number,
  ): Promise<(Address & Person)[]> {
    const offset = (page - 1) * limit

    const query = `
      SELECT address.*, person.*
      FROM address
      JOIN person ON address.person_id = person.id
      WHERE person.id = $1
      LIMIT $2 OFFSET $3
    `

    const result = await database.clientInstance?.query<Address & Person>(
      query,
      [personId, limit, offset],
    )

    return result?.rows || []
  }

  async create({
    street,
    city,
    state,
    zip_code,
    person_id,
  }: Address): Promise<Address | undefined> {
    const result = await database.clientInstance?.query<Address>(
      `INSERT INTO "address" (street, city, state, zip_code, person_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [street, city, state, zip_code, person_id],
    )

    return result?.rows[0]
  }
}
