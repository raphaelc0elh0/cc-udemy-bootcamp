import { BaseEntity } from "../../common/BaseEntity"

export interface ProductProps {
  id?: string
  name: string
  description: string
  images: string[]
  price: number
  color?: string | null
}

export class Product extends BaseEntity<ProductProps> {
  public readonly id!: string
  public name!: string
  public description!: string
  public images!: string[]
  public price!: number
  public color?: string | null

  constructor(props: ProductProps, id: string) {
    super(props, id)
  }

  static create(props: ProductProps) {
    let id = props.id || this.generateUUID()

    return new Product({ ...props }, id)
  }
}
