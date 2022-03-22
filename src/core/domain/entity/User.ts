import { BaseEntity } from "../../common/BaseEntity"

export interface UserProps {
  id?: string
  firstName: string
  lastName: string
  gender?: "undefined" | "male" | "female"
}

export class User extends BaseEntity<UserProps> {
  public readonly id!: string
  public firstName!: string
  public lastName!: string
  public gender!: string

  constructor(props: UserProps, id: string) {
    super(props, id)
  }

  static create(props: UserProps) {
    let id = props.id || this.generateUUID()
    let gender = props.gender || "undefined"

    return new User({ ...props, gender }, id)
  }
}
