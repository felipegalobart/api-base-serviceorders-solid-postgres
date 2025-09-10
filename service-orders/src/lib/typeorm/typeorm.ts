import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { env } from '@/env'
import { Product } from '@/entities/product.entity'
import { Category } from '@/entities/category.entity'
import { ProductAutoGenerateUUID1757007529297 } from './migrations/1757007529297-ProductAutoGenerateUUID'
import { User } from '@/entities/user.entity'
import { CreateUserTable1757355372098 } from './migrations/1757355372098-CreateUserTable'
import { AddRoleToUser1757529235000 } from './migrations/1757529235000-AddRoleToUser'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  logging: env.NODE_ENV === 'development',
  entities: [Product, Category, User],
  migrations: [
    ProductAutoGenerateUUID1757007529297,
    CreateUserTable1757355372098,
    AddRoleToUser1757529235000,
  ],
})

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source TypeORM has been initialized!')
  })
  .catch((error) => {
    console.error('Error during Data Source TypeORM initialization', error)
  })
