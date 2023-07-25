import { RoomDTO } from './room'

export interface Feedback {
  roomDTO: RoomDTO
  accountName: string
  comment: string
  rating: number
}
