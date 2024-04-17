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
  }
]

export const addresses = [
  { address: '1234 Main St ', employeeId: 1 },
  { address: '2345 Side St ', employeeId: 2 },
  { address: '3456 Other St ', employeeId: 3 }
]

export const entretiens = [
  { id: 1, managerId: 1, employeeId: 2 },
  { id: 2, managerId: 1, employeeId: 3 }
]

export const users = [

  { email: 'allison.grande@gmail.com', password: 'password123', userId: 1 },
  { email: 'jane.smith@example.com' , password: 'password234', userId: 2 },
  { email: 'jim.beam@example.com', password: 'password345', userId: 3 }
]
