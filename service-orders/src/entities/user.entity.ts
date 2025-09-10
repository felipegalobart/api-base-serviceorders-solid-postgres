import 'reflect-metadata' // ← Adicionar no topo
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UserRole } from './models/user-role.enum'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ type: 'varchar', unique: true }) // ← Especificar tipo
  username: string

  @Column({ type: 'varchar' }) // ← Especificar tipo
  password: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: true,
  })
  role?: UserRole

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  constructor(username?: string, password?: string, role?: UserRole) {
    if (username) this.username = username
    if (password) this.password = password
    if (role) this.role = role
  }
}
