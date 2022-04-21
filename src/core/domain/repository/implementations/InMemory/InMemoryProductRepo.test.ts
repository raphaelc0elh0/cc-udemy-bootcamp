import { Chance } from "chance"
import { Product } from "../../../entity"
import { InMemoryProductRepo } from "."

const chance = new Chance()
const inMemoryProductRepo = new InMemoryProductRepo()

describe("InMemoryProductRepo", () => {
  it("product should be added", async () => {
    // init product
    const testProduct = Product.create({
      name: chance.name(),
      description: chance.sentence({ words: 5 }),
      images: [chance.url()],
      price: chance.natural({ min: 1, max: 20 }) * 100,
      color: chance.color()
    })

    // add product
    const productRepo = await inMemoryProductRepo.add(testProduct)
    if (!productRepo) throw new Error("Error")

    expect(productRepo).toBeDefined()
    expect(productRepo.id).toBeDefined()
    expect(productRepo.name).toBe(testProduct.name)
    expect(productRepo.description).toBe(testProduct.description)
    expect(productRepo.images).toBe(testProduct.images)
    expect(productRepo.price).toBe(testProduct.price)
    expect(productRepo.color).toBe(testProduct.color)

    // get the product
    const getProductRepo = await inMemoryProductRepo.getById(testProduct.id)
    expect(getProductRepo).toBe(productRepo)
  })
  it("product should be updated", async () => {
    // init product
    const testProduct = Product.create({
      name: chance.name(),
      description: chance.sentence({ words: 5 }),
      images: [chance.url()],
      price: chance.natural({ min: 1, max: 20 }) * 100,
      color: chance.color()
    })

    // add product
    const productRepo = await inMemoryProductRepo.add(testProduct)
    if (!productRepo) throw new Error("Error")

    expect(productRepo).toBeDefined()

    // update product
    const updatedProductRepo = await inMemoryProductRepo.update({ ...productRepo, color: "blue" })

    expect(updatedProductRepo?.id).toEqual(productRepo.id)
    expect(updatedProductRepo?.color).toEqual("blue")
  })
  it("product should be deleted", async () => {
    // init two products
    const willBeDeletedProduct = Product.create({
      name: chance.name(),
      description: chance.sentence({ words: 5 }),
      images: [chance.url()],
      price: chance.natural({ min: 1, max: 20 }) * 100,
      color: chance.color()
    })
    const testProduct = Product.create({
      name: chance.name(),
      description: chance.sentence({ words: 5 }),
      images: [chance.url()],
      price: chance.natural({ min: 1, max: 20 }) * 100,
      color: chance.color()
    })

    // add two products
    const willBeDeletedProductRepo = await inMemoryProductRepo.add(willBeDeletedProduct)
    expect(willBeDeletedProductRepo).toBeDefined()
    const testProductRepo = await inMemoryProductRepo.add(testProduct)
    expect(testProductRepo).toBeDefined()

    // delete one product
    const deletedProductRepo = await inMemoryProductRepo.delete(willBeDeletedProduct.id)
    expect(deletedProductRepo).toEqual(willBeDeletedProductRepo)

    // try to get deleted product ( should be undefined )
    const getDeletedProductRepo = await inMemoryProductRepo.getById(willBeDeletedProduct.id)
    expect(getDeletedProductRepo).toBeUndefined()

    // check that the second product is defined ( not deleted )
    const getTestProductRepo = await inMemoryProductRepo.getById(testProduct.id)
    expect(getTestProductRepo).toBeDefined()
  })
})
