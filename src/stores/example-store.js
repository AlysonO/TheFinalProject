import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    employees: [],
    addresses: [],
    interviews: []
  }),
  getters: {
    fullEmployees: (state) => {
      return state.employees.map((employee) => ({
        ...employee,
        address: state.addresses.find((address) => address.employee_id === employee.id),
        interviews: state.interviews.filter((interview) => interview.employee_id === employee.id)
      }))
    }
  },
  actions: {
    //add or remove some action here , i tried to make some exemple
    fetchEmployees() {},
    addEmployee(employee) {
      this.employees.push(employee)
    },
    fetchAddresses() {},
    addAddress(address) {
      this.addresses.push(address)
    },
    fetchInterviews() {},
    addInterview(interview) {
      this.interviews.push(interview)
    }
  }
})
