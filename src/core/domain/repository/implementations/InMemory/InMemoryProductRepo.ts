import { InMemory as InMemoryDB } from "../../../../infra/database"

import { Product } from "../../../entity/Product"
import { IProductRepo } from "../IProductRepo"

export class InMemoryProductRepo implements IProductRepo {
  async add(input: Product): Promise<Product | null> {
    const product = input
    InMemoryDB.products.push(product)
    return product
  }

  async update(input: Product): Promise<Product | null> {
    const updatedProduct = input
    const index = InMemoryDB.products.findIndex((product) => product.id === updatedProduct.id)
    if (index >= 0) {
      InMemoryDB.products[index] = updatedProduct
      return InMemoryDB.products[index]
    }
    return null
  }

  async delete(id: Product["id"]): Promise<Product | null> {
    const index = InMemoryDB.products.findIndex((product) => product.id === id)
    const product = InMemoryDB.products[index]
    if (index >= 0) {
      InMemoryDB.products.splice(index, 1)
      return product
    }
    return null
  }

  async getById(id: Product["id"]): Promise<Product | null> {
    const index = InMemoryDB.products.findIndex((product) => product.id === id)
    const product = InMemoryDB.products[index]
    return product
  }

  async getAll(): Promise<Product[] | null> {
    return InMemoryDB.products
  }
}
