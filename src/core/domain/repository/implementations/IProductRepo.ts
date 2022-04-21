import { Product } from "../../entity/Product"

export interface IProductRepo {
  add(input: Product): Promise<Product | null>
  update(input: Product): Promise<Product | null>
  delete(id: Product["id"]): Promise<Product | null>
  getById(id: Product["id"]): Promise<Product | null>
  getAll(): Promise<Product[] | null>
}
