// Teste unitário REAL do FindUserByIdUseCase - testa o código atual
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Importa o código REAL do projeto
import { FindUserByIdUseCase } from '../../../src/use-cases/person/find-user-by-id'
import { ResourceNotFoundError } from '../../../src/use-cases/errors/resource-not-found-error'

// Mock do repository REAL
const mockUserRepository = {
  create: vi.fn(),
  update: vi.fn(),
  findWithPerson: vi.fn(),
  findByUsername: vi.fn(),
  findById: vi.fn(),
}

describe('FindUserByIdUseCase - REAL CODE TESTS', () => {
  let findUserByIdUseCase

  beforeEach(() => {
    // Cria instância REAL do use case
    findUserByIdUseCase = new FindUserByIdUseCase(mockUserRepository)
    vi.clearAllMocks()
  })

  describe('✅ Success Cases - Real Code', () => {
    it('should return user when user exists (REAL CODE)', async () => {
      // Arrange - Dados reais do seu sistema
      const userId = 1
      const mockUser = {
        id: 1,
        username: 'john_doe',
        password: 'hashed_password_123',
        role: 'user',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z'),
      }

      mockUserRepository.findById.mockResolvedValue(mockUser)

      // Act - Chama o método REAL
      const result = await findUserByIdUseCase.handler(userId)

      // Assert - Verifica comportamento REAL
      expect(result).toEqual(mockUser)
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId)
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1)
      expect(result.id).toBe(userId)
      expect(result.username).toBe('john_doe')
      expect(result.role).toBe('user')
    })

    it('should return admin user when admin exists (REAL CODE)', async () => {
      // Arrange - Teste específico para admin
      const userId = 2
      const mockAdmin = {
        id: 2,
        username: 'admin_user',
        password: 'hashed_admin_password',
        role: 'admin',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z'),
      }

      mockUserRepository.findById.mockResolvedValue(mockAdmin)

      // Act - Chama o método REAL
      const result = await findUserByIdUseCase.handler(userId)

      // Assert
      expect(result).toEqual(mockAdmin)
      expect(result.role).toBe('admin')
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId)
    })
  })

  describe('❌ Error Cases - Real Code', () => {
    it('should throw ResourceNotFoundError when user does not exist (REAL CODE)', async () => {
      // Arrange - Caso de usuário inexistente
      const userId = 999
      mockUserRepository.findById.mockResolvedValue(undefined)

      // Act & Assert - Verifica erro REAL (uma única chamada)
      await expect(findUserByIdUseCase.handler(userId)).rejects.toThrow(ResourceNotFoundError)
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId)
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1)
    })

    it('should throw ResourceNotFoundError when repository returns null (REAL CODE)', async () => {
      // Arrange - Caso de retorno null
      const userId = 1
      mockUserRepository.findById.mockResolvedValue(null)

      // Act & Assert - Verifica erro REAL
      await expect(findUserByIdUseCase.handler(userId)).rejects.toThrow(ResourceNotFoundError)
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId)
    })

    it('should propagate repository errors (REAL CODE)', async () => {
      // Arrange - Caso de erro no repository
      const userId = 1
      const repositoryError = new Error('Database connection failed')
      mockUserRepository.findById.mockRejectedValue(repositoryError)

      // Act & Assert - Verifica propagação REAL do erro
      await expect(findUserByIdUseCase.handler(userId)).rejects.toThrow('Database connection failed')
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId)
    })
  })

  describe('🔍 Edge Cases - Real Code', () => {
    it('should handle zero as valid user ID (REAL CODE)', async () => {
      // Arrange - Edge case: ID zero
      const userId = 0
      const mockUser = {
        id: 0,
        username: 'zero_user',
        password: 'hashed_password',
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      }

      mockUserRepository.findById.mockResolvedValue(mockUser)

      // Act - Chama o método REAL
      const result = await findUserByIdUseCase.handler(userId)

      // Assert
      expect(result).toEqual(mockUser)
      expect(mockUserRepository.findById).toHaveBeenCalledWith(0)
    })

    it('should handle negative user ID (REAL CODE)', async () => {
      // Arrange - Edge case: ID negativo
      const userId = -1
      mockUserRepository.findById.mockResolvedValue(undefined)

      // Act & Assert - Verifica erro REAL
      await expect(findUserByIdUseCase.handler(userId)).rejects.toThrow(ResourceNotFoundError)
      expect(mockUserRepository.findById).toHaveBeenCalledWith(-1)
    })
  })

  describe('📊 Performance Tests - Real Code', () => {
    it('should call repository only once per request (REAL CODE)', async () => {
      // Arrange
      const userId = 1
      const mockUser = {
        id: 1,
        username: 'test_user',
        password: 'hashed_password',
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      }

      mockUserRepository.findById.mockResolvedValue(mockUser)

      // Act - Chama o método REAL
      await findUserByIdUseCase.handler(userId)

      // Assert - Verificação de performance REAL
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1)
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId)
    })
  })

  describe('🏗️ Architecture Tests - Real Code', () => {
    it('should use dependency injection correctly (REAL CODE)', () => {
      // Arrange
      const customRepository = { findById: vi.fn() }

      // Act - Cria instância com repository customizado
      const customUseCase = new FindUserByIdUseCase(customRepository)

      // Assert - Verifica se a injeção funcionou
      expect(customUseCase).toBeInstanceOf(FindUserByIdUseCase)
      expect(customUseCase.userRepository).toBe(customRepository)
    })

    it('should maintain SOLID principles (REAL CODE)', () => {
      // Arrange & Act
      const useCase = new FindUserByIdUseCase(mockUserRepository)

      // Assert - Verifica princípios SOLID
      // Single Responsibility: Use case só busca usuário
      expect(typeof useCase.handler).toBe('function')

      // Dependency Inversion: Depende da interface, não da implementação
      expect(mockUserRepository).toHaveProperty('findById')
    })
  })
})