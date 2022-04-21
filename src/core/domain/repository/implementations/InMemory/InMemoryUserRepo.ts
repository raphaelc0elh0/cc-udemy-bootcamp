import { InMemory as InMemoryDB } from "../../../../infra/database"

import { User } from "../../../entity/User"
import { IUserRepo } from "../IUserRepo"

export class InMemoryUserRepo implements IUserRepo {
  async add(input: User): Promise<User | null> {
    const user = input
    InMemoryDB.users.push(user)
    return user
  }

  async update(input: User): Promise<User | null> {
    const updatedUser = input
    const index = InMemoryDB.users.findIndex((user) => user.id === updatedUser.id)
    if (index >= 0) {
      InMemoryDB.users[index] = updatedUser
      return InMemoryDB.users[index]
    }
    return null
  }

  async delete(id: User["id"]): Promise<User | null> {
    const index = InMemoryDB.users.findIndex((user) => user.id === id)
    const user = InMemoryDB.users[index]
    if (index >= 0) {
      InMemoryDB.users.splice(index, 1)
      return user
    }
    return null
  }

  async getById(id: User["id"]): Promise<User | null> {
    const index = InMemoryDB.users.findIndex((user) => user.id === id)
    const user = InMemoryDB.users[index]
    return user
  }

  async getAll(): Promise<User[] | null> {
    return InMemoryDB.users
  }
}
