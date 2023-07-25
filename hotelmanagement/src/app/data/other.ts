export type Role = 'ROLE_Admin' | 'ROLE_Staff' | 'ROLE_Customer' | 'ALL'
export type RoleId = 1 | 2 | 3
export type Gender = 'Female' | 'Male' | 'Other'
export type TypeRoom =
  | 'Single'
  | 'Double'
  | 'Triple'
  | 'Executive Suite'
  | 'Junior Suite'
  | 'President Suite'
  | 'Connecting Room'
  | 'SuperMan'
export interface TypeRoomResponse {
  color: string
  level: TypeRoom
}
export type PaymentMethod = 'VISA' | 'MASTER_CARD' | 'CASH'
export type BookingStatus = 'pending' | 'Done'
