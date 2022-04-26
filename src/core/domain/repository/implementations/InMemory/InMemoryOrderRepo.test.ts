import { Chance } from "chance"
import { Order } from "../../../entity"
import { InMemoryOrderRepo } from "."
import { customAlphabet } from "nanoid"

const chance = new Chance()
const inMemoryOrderRepo = new InMemoryOrderRepo()
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuwxyz", 16)

describe("InMemoryOrderRepo", () => {
  it("order should be added", async () => {
    // init order
    const testOrder = Order.create({
      date: new Date(),
      isPayed: true,
      userId: nanoid(),
      productIds: [nanoid(), nanoid()]
    })

    // add order
    const orderRepo = await inMemoryOrderRepo.add(testOrder)
    if (!orderRepo) throw new Error("Error")

    expect(orderRepo).toBeDefined()
    expect(orderRepo.id).toBeDefined()
    expect(orderRepo.date).toBe(testOrder.date)
    expect(orderRepo.isPayed).toBe(testOrder.isPayed)
    expect(orderRepo.userId).toBe(testOrder.userId)
    expect(orderRepo.productIds).toBe(testOrder.productIds)

    // get the order
    const getOrderRepo = await inMemoryOrderRepo.getById(testOrder.id)
    expect(getOrderRepo).toBe(orderRepo)
  })
  it("order should be updated", async () => {
    // init order
    const testOrder = Order.create({
      date: new Date(),
      isPayed: true,
      userId: nanoid(),
      productIds: [nanoid(), nanoid()]
    })

    // add order
    const orderRepo = await inMemoryOrderRepo.add(testOrder)
    if (!orderRepo) throw new Error("Error")

    expect(orderRepo).toBeDefined()

    // update order
    const updatedOrderRepo = await inMemoryOrderRepo.update({ ...orderRepo, isPayed: false })

    expect(updatedOrderRepo?.id).toEqual(orderRepo.id)
    expect(updatedOrderRepo?.isPayed).toEqual(false)
  })
  it("order should be deleted", async () => {
    // init two orders
    const willBeDeletedOrder = Order.create({
      date: new Date(),
      isPayed: true,
      userId: nanoid(),
      productIds: [nanoid(), nanoid()]
    })
    const testOrder = Order.create({
      date: new Date(),
      isPayed: true,
      userId: nanoid(),
      productIds: [nanoid(), nanoid()]
    })

    // add two orders
    const willBeDeletedOrderRepo = await inMemoryOrderRepo.add(willBeDeletedOrder)
    expect(willBeDeletedOrderRepo).toBeDefined()
    const testOrderRepo = await inMemoryOrderRepo.add(testOrder)
    expect(testOrderRepo).toBeDefined()

    // delete one order
    const deletedOrderRepo = await inMemoryOrderRepo.delete(willBeDeletedOrder.id)
    expect(deletedOrderRepo).toEqual(willBeDeletedOrderRepo)

    // try to get deleted order ( should be undefined )
    const getDeletedOrderRepo = await inMemoryOrderRepo.getById(willBeDeletedOrder.id)
    expect(getDeletedOrderRepo).toBeUndefined()

    // check that the second order is defined ( not deleted )
    const getTestOrderRepo = await inMemoryOrderRepo.getById(testOrder.id)
    expect(getTestOrderRepo).toBeDefined()
  })
})
