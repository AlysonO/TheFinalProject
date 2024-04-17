export const employees = [
  {
    id: 1,
    name: 'John ',
    surname: 'Doe ',
    phoneNumber: 1234567890,
    mail: 'john.doe@example.com ',
    managerId: null,
    role: 'Manager '
  },
  {
    id: 2,
    name: 'Jane ',
    surname: 'Smith ',
    phoneNumber: 2345678901,
    mail: 'jane.smith@example.com ',
    managerId: 1,
    role: 'Employee '
  },
  {
    id: 3,
    name: 'Jim ',
    surname: 'Beam ',
    phoneNumber: 3456789012,
    mail: 'jim.beam@example.com ',
    managerId: 1,
    role: 'Employee '
  },
  {
    id: 4,
    name: 'Kyeomie',
    surname: 'Kim',
    phoneNumber: 4567890123,
    mail: 'cutieG@caratland.com',
    managerId: 5,
    role: 'Employee'
  },
  {
    id: 5,
    name: 'Woozi',
    surname: 'Kim',
    phoneNumber: 4567890123,
    mail: 'godofmusic@caratland.com',
    managerId: 6,
    role: 'Manager'
  },
  {
    id: 6,
    name: 'Cheolie',
    surname: 'Rideo',
    phoneNumber: 4567890123,
    mail: 'scoupsinthesoop@caratland.com',
    managerId: null,
    role: 'Manager'
  }
]

export const addresses = [
  { address: '1234 Main St ', employeeId: 1 },
  { address: '2345 Side St ', employeeId: 2 },
  { address: '3456 Other St ', employeeId: 3 }
]

export const entretiens = [
  { id: 1, managerId: 1, employeeId: 2, date: '2022-10-22T10:32:02.001' },
  { id: 2, managerId: 1, employeeId: 3, date: '2023-10-22T10:32:02.001' },
  { id: 3, managerId: 1, employeeId: 3, date: '2025-10-22T10:32:02.001' },
  { id: 4, managerId: 6, employeeId: 5, date: '2024-10-22T10:32:02.001' },
  { id: 5, managerId: 5, employeeId: 4, date: '2023-10-22T10:32:02.001' },
  { id: 6, managerId: 5, employeeId: 4, date: '2022-10-22T10:32:02.001' }
]

export const users = [
  { email: 'allison.grande@gmail.com', password: 'password123', userId: 1 },
  { email: 'jane.smith@example.com', password: 'password234', userId: 2 },
  { email: 'jim.beam@example.com', password: 'password345', userId: 3 },
  { email: 'cutieG@caratland.com', password: 'headliner', userId: 4 },
  { email: 'godofmusic@caratland.com', password: 'headliner', userId: 5 },
  { email: 'scoupsinthesoop@caratland.com', password: 'headliner', userId: 6 }
]
