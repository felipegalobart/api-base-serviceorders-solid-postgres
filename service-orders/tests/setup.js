// Setup JavaScript profissional - funciona sempre
import 'reflect-metadata'

// Mock do TypeORM - isolamento completo
vi.mock('./src/lib/typeorm/typeorm', () => ({
  AppDataSource: {
    getRepository: vi.fn(() => ({
      findOne: vi.fn(),
      save: vi.fn(),
      create: vi.fn(),
      createQueryBuilder: vi.fn(() => ({
        leftJoinAndSelect: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        getOne: vi.fn(),
      })),
    })),
    initialize: vi.fn(),
    destroy: vi.fn(),
  },
}))

// Mock do bcryptjs - performance nos testes
vi.mock('bcryptjs', () => ({
  hash: vi.fn().mockImplementation((password) => Promise.resolve(`hashed_${password}`)),
  compare: vi.fn().mockImplementation((password, hash) => Promise.resolve(hash.includes(password))),
}))

// Mock do JWT
vi.mock('jsonwebtoken', () => ({
  sign: vi.fn().mockReturnValue('mock_jwt_token'),
  verify: vi.fn().mockReturnValue({ userId: 1, username: 'test_user' }),
}))

// Configurações globais
beforeEach(() => {
  vi.clearAllMocks()
})

// Timeout para testes assíncronos
vi.setConfig({ testTimeout: 10000 })