import { Chance } from "chance"
import { User } from "../../../entity"
import { InMemoryUserRepo } from "./"

const chance = new Chance()
const inMemoryUserRepo = new InMemoryUserRepo()

describe("InMemoryUserRepo", () => {
  it("user should be added", async () => {
    // init user
    const testUser = User.create({ firstName: chance.first(), lastName: chance.last(), gender: "female" })

    // add user
    const userRepo = await inMemoryUserRepo.add(testUser)
    if (!userRepo) throw new Error("Error")

    expect(userRepo).toBeDefined()
    expect(userRepo.id).toBeDefined()
    expect(userRepo.firstName).toBe(testUser.firstName)
    expect(userRepo.lastName).toBe(testUser.lastName)
    expect(userRepo.gender).toBe(testUser.gender)
  })
  it("user should be updated", async () => {
    // init user
    const testUser = User.create({ firstName: chance.first(), lastName: chance.last(), gender: "female" })

    // add user
    const userRepo = await inMemoryUserRepo.add(testUser)
    if (!userRepo) throw new Error("Error")

    expect(userRepo).toBeDefined()

    // update user
    const updatedUserRepo = await inMemoryUserRepo.update({ ...userRepo, gender: "male" })

    expect(updatedUserRepo?.id).toEqual(userRepo.id)
    expect(updatedUserRepo?.gender).toEqual("male")
  })
  it("user should be deleted", async () => {
    // init two users
    const willBeDeletedUser = User.create({ firstName: chance.first(), lastName: chance.last(), gender: "male" })
    const testUser = User.create({ firstName: chance.first(), lastName: chance.last(), gender: "female" })

    // add two users
    const willBeDeletedUserRepo = await inMemoryUserRepo.add(willBeDeletedUser)
    expect(willBeDeletedUserRepo).toBeDefined()
    const testUserRepo = await inMemoryUserRepo.add(testUser)
    expect(testUserRepo).toBeDefined()

    // delete one user
    const deletedUserRepo = await inMemoryUserRepo.delete(willBeDeletedUser.id)
    expect(deletedUserRepo).toEqual(willBeDeletedUserRepo)

    // try to get deleted user ( should be undefined )
    const getDeletedUserRepo = await inMemoryUserRepo.getById(willBeDeletedUser.id)
    expect(getDeletedUserRepo).toBeUndefined()

    // check that the second user is defined ( not deleted )
    const getTestUserRepo = await inMemoryUserRepo.getById(testUser.id)
    expect(getTestUserRepo).toBeDefined()
  })
})
