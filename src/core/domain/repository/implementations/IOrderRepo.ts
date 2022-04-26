import { Order } from "../../entity/Order"

export interface IOrderRepo {
  add(input: Order): Promise<Order | null>
  update(input: Order): Promise<Order | null>
  delete(id: Order["id"]): Promise<Order | null>
  getById(id: Order["id"]): Promise<Order | null>
  getAll(): Promise<Order[] | null>
}
