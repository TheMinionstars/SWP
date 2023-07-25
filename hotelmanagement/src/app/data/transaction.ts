import { AccountDTO } from './account'
import { BookingStatus } from './other'
import { RoomDTO } from './room'

export interface ServiceDTO {
  serviceId: number
  name: string
  description: string
  price: number
}

export interface BookingDTO {
  bookingId?: number
  accountId: AccountDTO
  status: BookingStatus
  checkinDate: string
  checkoutDate: string
  roomDTOList: RoomDTO[]
  serviceDTOList: ServiceDTO[]
  totalPrice: number
}

export interface PaymentDTO {
  paymentId: number
  method: string
}

export interface TransactionDTO {
  transactionId: number
  bookingDTO: BookingDTO
  paymentDTO: PaymentDTO
}
