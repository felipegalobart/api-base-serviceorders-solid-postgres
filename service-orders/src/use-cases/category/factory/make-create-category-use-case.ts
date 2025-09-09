import { CategoryRepository } from '@/repositories/typeorm/category.repository'
import { CreateCategoryUseCase } from '@/use-cases/category/create-category'

export function makeCreateCategoryUseCase() {
  const categoryRepository = new CategoryRepository()
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)

  return createCategoryUseCase
}
