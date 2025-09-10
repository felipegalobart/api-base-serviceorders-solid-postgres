import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeUpdateUserUseCase } from '@/use-cases/user/factory/make-update-user-use-case'
import type { UserRole } from '@/entities/models/user-role.enum'
import type { IUser } from '@/entities/models/user.interface'
import bcrypt from 'bcryptjs'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = registerParamsSchema.parse(request.params)

  const registerBodySchema = z.object({
    username: z.string().optional(),
    password: z.string().optional(),
    role: z.string().optional(),
  })

  const { username, password, role } = registerBodySchema.parse(request.body)

  const updateUserUseCase = makeUpdateUserUseCase()

  // Prepara dados para atualização (apenas campos fornecidos)
  const updateData: Partial<IUser> = {}

  if (username) updateData.username = username
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    updateData.password = hashedPassword
  }
  if (role) updateData.role = role as UserRole

  const user = await updateUserUseCase.handler(id, updateData)

  return reply.status(200).send(user)
}
