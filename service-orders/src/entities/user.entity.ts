import 'reflect-metadata' // ← Adicionar no topo
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ type: 'varchar', unique: true }) // ← Especificar tipo
  username: string

  @Column({ type: 'varchar' }) // ← Especificar tipo
  password: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  constructor(username?: string, password?: string) {
    if (username) this.username = username
    if (password) this.password = password
  }
}
