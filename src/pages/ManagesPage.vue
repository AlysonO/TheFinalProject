<template>
  <q-page class="manages-page">
    <!-- Search Bar -->
    <div class="search-bar q-ma-md">
      <q-input v-model="searchTerm" filled placeholder="Search by name...">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <!-- Employee Table -->
    <q-table
      :rows="filteredEmployees"
      :columns="columns"
      row-key="id"
      class="employee-table"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="action-buttons">
          <q-btn flat dense round icon="edit" @click="editEmployee(props.row)" />
          <q-btn flat dense round icon="delete" @click="deleteEmployee(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- Modal for adding/editing employee -->
    <q-dialog v-model="showModal" class="modal">
      <q-card class="modal-content">
        <q-card-section>
          <q-form @submit.prevent="submitEmployee">
            <q-input v-model.trim="formEmployee.name" label="Name" required />
            <q-input v-model.trim="formEmployee.surname" label="Surname" required />
            <q-input v-model.trim="formEmployee.mail" label="Email" required />
            <q-input v-model.number="formEmployee.managerId" label="Manager ID" type="number" required />
            <q-input v-model.number="formEmployee.phoneNumber" label="Phone Number" type="number" required />
            <div class="button-group">
              <q-btn type="submit" label="Save" color="primary" class="btn-save" />
              <q-btn :label="isEditing ? 'Cancel' : 'Close'" color="negative" class="btn-cancel" @click="closeModal" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Button to add new employee -->
    <q-fab class="add-btn" right bottom @click="addNewEmployee">
      <q-btn icon="add" color="primary" />
    </q-fab>
  </q-page>
</template>


<script>
import { employees } from 'src/data/data.js'

export default {
  name: 'ManagesPage',
  data() {
    return {
      searchTerm: '',
      showModal: false,
      isEditing: false,
      formEmployee: {
        id: null,
        name: '',
        surname: '',
        mail: '',
        managerId: '',
        phoneNumber: ''
      },
      employees: [],
      columns: [
        { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
        { name: 'surname', required: true, label: 'Surname', align: 'left', field: 'surname', sortable: true },
        { name: 'mail', required: true, label: 'Email', align: 'left', field: 'mail', sortable: true },
        { name: 'managerId', required: true, label: 'Manager ID', align: 'left', field: 'formattedManagerId', sortable: true },
        { name: 'phoneNumber', required: true, label: 'Phone Number', align: 'left', field: 'phoneNumber', sortable: true },
        { name: 'actions', label: 'Actions', align: 'left', field: 'actions' }
      ]
    }
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter(employee => employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
    }
  },
  created() {
  this.employees = employees.map(employee => {
    const managerId = employee.managerId === null && employee.role.trim() === 'Manager' ? employee.id : employee.managerId

    return {
      ...employee,
      formattedManagerId: this.formatManagerId(managerId, employee.role)
    }
  })
},

  methods: {
    addNewEmployee() {
      this.formEmployee = { id: null, name: '', surname: '', mail: '', managerId: '', phoneNumber: '' }
      this.isEditing = false
      this.showModal = true
    },
    deleteEmployee(id) {
      this.employees = this.employees.filter(employee => employee.id !== id)
    },
    editEmployee(employee) {
      this.formEmployee = { ...employee }
      this.isEditing = true
      this.showModal = true
    },
    submitEmployee() {
      if (this.isEditing) {
        const index = this.employees.findIndex(emp => emp.id === this.formEmployee.id)
        if (index !== -1) {
          this.employees[index] = { ...this.formEmployee, formattedManagerId: this.formatManagerId(this.formEmployee.managerId, this.formEmployee.role) }
        }
      } else {
        const newId = this.employees.length ? this.employees[this.employees.length - 1].id + 1 : 1
        this.employees.push({ ...this.formEmployee, id: newId, formattedManagerId: this.formatManagerId(this.formEmployee.managerId, this.formEmployee.role) })
      }
      this.closeModal()
    },
    closeModal() {
      this.showModal = false
    },
    formatManagerId(managerId, role) {
  if (role.trim() === 'Manager') {
    return `M(${managerId})`
  } else {
    return managerId ? managerId.toString() : 'N/A'
  }
},

  }
}
</script>

<style scoped>
/* Table and Search styles */
.employee-table {
  width: 100%;
  margin-bottom: 20px;
}

.employee-table th, .employee-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.employee-table th {
  background-color: #f4f4f4;
}

.search-bar {
  margin: 0 auto 20px auto;
}

/* Button styles */
.add-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.button-group {
  margin-top: 20px;
}

.action-buttons {
  margin-right: 10px;
}

.btn-save, .btn-cancel {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}

.btn-save:hover, .btn-cancel:hover {
  filter: brightness(85%);
}

.btn-save {
  background-color: #007bff;
  color: white;
  margin-right: 10px;
}

.btn-cancel {
  background-color: #dc3545;
  color: white;
}

/* Modal Overlay styles */
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

/* Modal Content styles */
.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  max-width: 600px;
}

</style>
