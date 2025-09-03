import { DataSource } from 'typeorm'
import { env } from '@/env'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  logging: env.NODE_ENV === 'development',
  entities: ['./entities/**/*.ts'],
})

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source TypeORM has been initialized!')
  })
  .catch((error) => {
    console.error('Error during Data Source TypeORM initialization', error)
  })
