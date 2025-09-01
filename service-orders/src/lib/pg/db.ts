import { Pool, type PoolClient } from 'pg'

const CONFIG = {
  user: '',
  host: '',
  database: '',
  password: '',
  port: 0,
}

class Database {
  private pool: Pool
  private client: PoolClient | undefined

  constructor() {
    this.pool = new Pool(CONFIG)
    this.connection()
  }

  private async connection() {
    try {
      this.client = await this.pool.connect()
    } catch (error) {
      console.error(`Error connecting to database: ${error}`)

      throw new Error(`Error connecting to database: ${error}`)
    }
  }

  get clientInstance() {
    return this.client
  }
}

export const database = new Database()
