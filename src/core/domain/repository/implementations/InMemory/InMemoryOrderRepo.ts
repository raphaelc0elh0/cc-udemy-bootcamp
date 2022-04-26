import { InMemory as InMemoryDB } from "../../../../infra/database"

import { Order } from "../../../entity/Order"
import { IOrderRepo } from "../IOrderRepo"

export class InMemoryOrderRepo implements IOrderRepo {
  async add(input: Order): Promise<Order | null> {
    const order = input
    InMemoryDB.orders.push(order)
    return order
  }

  async update(input: Order): Promise<Order | null> {
    const updatedOrder = input
    const index = InMemoryDB.orders.findIndex((order) => order.id === updatedOrder.id)
    if (index >= 0) {
      InMemoryDB.orders[index] = updatedOrder
      return InMemoryDB.orders[index]
    }
    return null
  }

  async delete(id: Order["id"]): Promise<Order | null> {
    const index = InMemoryDB.orders.findIndex((order) => order.id === id)
    const order = InMemoryDB.orders[index]
    if (index >= 0) {
      InMemoryDB.orders.splice(index, 1)
      return order
    }
    return null
  }

  async getById(id: Order["id"]): Promise<Order | null> {
    const index = InMemoryDB.orders.findIndex((order) => order.id === id)
    const order = InMemoryDB.orders[index]
    return order
  }

  async getAll(): Promise<Order[] | null> {
    return InMemoryDB.orders
  }
}
