import { BaseEntity } from "../../common/BaseEntity"

export interface OrderProps {
  id?: string
  date: Date
  isPayed: boolean
  userId: string
  productIds: string[]
}

export class Order extends BaseEntity<OrderProps> {
  public readonly id!: string
  public date!: Date
  public isPayed!: boolean
  public userId!: string
  public productIds!: string[]

  constructor(props: OrderProps, id: string) {
    super(props, id)
  }

  static create(props: OrderProps) {
    let id = props.id || this.generateUUID()
    let date = props.date || new Date()

    return new Order({ ...props, date }, id)
  }
}
