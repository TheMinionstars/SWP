import { Gender, Role } from './other'

export interface JwtResponse {
  accessToken: string
  tokenType: string
  userId: number
  email: string
  role: Role
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  sex: Gender
}
