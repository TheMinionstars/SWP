import { Gender, RoleId } from './other'

export interface AccountDTO {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  avatar: string
  sex: Gender
  phoneNum: string
  address: string
  roleId: RoleId
}
