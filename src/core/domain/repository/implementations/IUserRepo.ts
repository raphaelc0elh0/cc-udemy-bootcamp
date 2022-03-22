import { User, UserProps } from "../../entity/User"

export interface IUserRepo {
  add(input: User): Promise<User | null>
  update(input: User): Promise<User | null>
  delete(id: User["id"]): Promise<User | null>
  getById(id: User["id"]): Promise<User | null>
  getAll(id: User["id"]): Promise<User[] | null>
}
