import { TypeRoom } from './other'

export interface RoomCategoryDTO {
  id: number
  name: TypeRoom
  amount: number
  description: string
}
export interface RoomDTO {
  roomId: number
  name: string
  roomCategoryDTO: RoomCategoryDTO
  image: string
  price: number
  rent: boolean
}
