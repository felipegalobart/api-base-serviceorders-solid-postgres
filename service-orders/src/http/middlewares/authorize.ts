import type { FastifyRequest, FastifyReply } from 'fastify'
import { AppDataSource } from '@/lib/typeorm/typeorm'
import { User } from '@/entities/user.entity'
import type {
  AuthorizationConfig,
  UserContext,
} from '@/entities/models/authorization.interface'
import { UserRole } from '@/entities/models/user-role.enum'

export function authorize(config: AuthorizationConfig) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // 1. Verificar se o token JWT é válido (já foi verificado pelo jwtValidate)
      // O Fastify já fez a verificação, então podemos acessar request.user

      // 2. Buscar usuário no banco para verificar role
      const userRepository = AppDataSource.getRepository(User)
      // request.user pode ser string | object | Buffer, então precisamos garantir que é um objeto com id
      let userId: number | undefined

      if (
        typeof request.user === 'object' &&
        request.user !== null &&
        'userId' in request.user
      ) {
        userId = (request.user as any).userId
      }

      if (!userId) {
        return reply
          .status(401)
          .send({ message: 'ID do usuário não encontrado no token' })
      }

      const user = await userRepository.findOne({ where: { id: userId } })

      if (!user) {
        return reply.status(401).send({ message: 'Usuário não encontrado' })
      }

      // 3. Verificar se usuário tem role
      if (!user.role) {
        return reply.status(403).send({ message: 'Usuário sem role definido' })
      }

      // 4. Verificar se usuário tem role necessário
      const hasPermission = checkPermission(
        user.role,
        config,
        request.params,
        user.id!,
      )

      if (!hasPermission) {
        return reply.status(403).send({ message: 'Acesso negado' })
      }

      // 5. Não sobrescrever request.user - deixar como está
    } catch (error) {
      console.error('Erro no middleware de autorização:', error)
      return reply.status(500).send({ message: 'Erro interno do servidor' })
    }
  }
}

function checkPermission(
  userRole: UserRole,
  config: AuthorizationConfig,
  params: any,
  currentUserId: number,
): boolean {
  // 1. Verificar se tem role necessário
  if (!config.requiredRoles.includes(userRole)) {
    return false
  }

  // 2. Verificar se pode editar a si mesmo (se allowSelf estiver habilitado)
  if (config.allowSelf && params.id) {
    const targetUserId = parseInt(params.id)
    return currentUserId === targetUserId
  }

  return true
}
