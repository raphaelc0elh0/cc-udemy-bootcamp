import { customAlphabet } from "nanoid"
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuwxyz", 16)

export class BaseEntity<T> {
  constructor(props: T, id?: number | string) {
    Object.assign(this, { ...props, id })
  }

  static generateUUID() {
    return nanoid()
  }
}
