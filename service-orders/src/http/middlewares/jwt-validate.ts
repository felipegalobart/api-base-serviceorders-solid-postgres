import type { FastifyRequest, FastifyReply } from 'fastify'

export async function jwtValidate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const route = request.routeOptions.url
    const method = request.method

    if (route === '/users' && method === 'POST') return

    await request.jwtVerify()
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
