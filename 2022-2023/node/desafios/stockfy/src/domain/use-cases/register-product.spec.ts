import { RegisterProductUseCase } from './register-product'
import { ProductsRepository } from '../repositories/products.repository'
import { Product } from '../entities/product'

const fakeProductsRepository: ProductsRepository = {
  create: async (product: Product) => {
    return
  }
}

test('register a product', async () => {
  const registerProduct = new RegisterProductUseCase(fakeProductsRepository)

  const product = await registerProduct.execute({
    name: 'Product A',
    price: 1000,
    size: 'big',
    color: 'red',
    inStock: 1000,
    minStock: 50
  })

  expect(product.name).toEqual('Product A')
})
