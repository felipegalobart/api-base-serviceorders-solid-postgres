import type { FastifyRequest, FastifyReply } from 'fastify'

export async function jwtValidate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const route = request.routeOptions.url
    const method = request.method

    const publicRoutes = [
      { method: 'POST', url: '/user' },
      { method: 'POST', url: '/user/signin' },
    ]

    const isPublic = publicRoutes.some(
      (routeConfig) =>
        routeConfig.method === method &&
        routeConfig.url === request.routeOptions.url,
    )

    if (isPublic) return

    await request.jwtVerify()
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
