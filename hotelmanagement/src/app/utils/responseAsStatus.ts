import { BookingStatus, Gender, Role, RoleId, TypeRoom, TypeRoomResponse } from '../data/other'

export const userRoleAsResponse = (role?: Role) => {
  if (role === 'ROLE_Admin') {
    return {
      color: 'magenta',
      level: 'ADMIN'
    }
  }
  if (role === 'ROLE_Staff') {
    return {
      color: 'purple',
      level: 'STAFF'
    }
  }
  if (role === 'ROLE_Customer') {
    return {
      color: 'green',
      level: 'CUSTOMER'
    }
  }
  return {
    color: 'default',
    level: 'UNKNOWN'
  }
}
export const userRoleIdAsResponse = (roleId?: RoleId) => {
  if (roleId === 1) {
    return {
      color: 'red',
      level: 'Admin'
    }
  }
  if (roleId === 3) {
    return {
      color: 'green',
      level: 'Customer'
    }
  }
  if (roleId === 2) {
    return {
      color: 'blue',
      level: 'Staff'
    }
  }
  return {
    color: 'default',
    level: 'Unknown'
  }
}
export const userGenderAsResponse = (gender: Gender) => {
  if (gender === 'Male') {
    return {
      color: 'blue',
      level: 'Nam'
    }
  }
  if (gender === 'Female') {
    return {
      color: 'pink',
      level: 'Nữ'
    }
  }
  if (gender === 'Other') {
    return {
      color: 'purple',
      level: 'Nữ'
    }
  }
  return {
    color: 'default',
    level: 'UNKNOWN'
  }
}
export const roomTypeAsResponse = (type: TypeRoom): TypeRoomResponse => {
  const typeColorMap: { [key in TypeRoom]: TypeRoomResponse } = {
    Double: {
      color: 'green',
      level: 'Double'
    },
    Single: {
      color: 'blue',
      level: 'Single'
    },
    Triple: {
      color: 'red',
      level: 'Triple'
    },
    'Executive Suite': {
      color: 'purple',
      level: 'Executive Suite'
    },
    'Junior Suite': {
      color: 'orange',
      level: 'Junior Suite'
    },
    'President Suite': {
      color: 'gold',
      level: 'President Suite'
    },
    'Connecting Room': {
      color: 'yellow',
      level: 'Connecting Room'
    },
    SuperMan: {
      color: 'black',
      level: 'SuperMan'
    }
  }

  return typeColorMap[type] || { color: 'default', level: 'UNKNOWN' }
}
export const roomStatusAsResponse = (status: boolean) => {
  if (status === true) {
    return {
      color: 'green',
      level: 'Đã thuê'
    }
  }
  if (status === false) {
    return {
      color: 'blue',
      level: 'Chưa thuê'
    }
  }
  return {
    color: 'default',
    level: 'UNKNOWN'
  }
}
export const bookingStatusAsResponse = (status: BookingStatus) => {
  if (status === 'Done') {
    return {
      color: 'green',
      level: 'Done'
    }
  }
  if (status === 'pending') {
    return {
      color: 'blue',
      level: 'Pending'
    }
  }
  return {
    color: 'default',
    level: 'UNKNOWN'
  }
}
