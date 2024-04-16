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
            <q-input v-model="formEmployee.name" label="Name" required />
            <q-input v-model="formEmployee.surname" label="Surname" required />
            <q-input v-model="formEmployee.email" label="Email" required />
            <q-input v-model.number="formEmployee.managerId" label="Manager ID" type="number" required />
            <q-input v-model.number="formEmployee.phoneNumber" label="Phone Number" type="number" required />
            <div class="button-group">
              <q-btn type="submit" label="Save" color="primary" class="btn-save" />
              <q-btn v-if="isEditing" label="Cancel" color="negative" class="btn-cancel" @click="closeModal" />
              <q-btn v-else label="Cancel" class="btn-cancel" @click="closeModal" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Button to add new employee -->
    <q-fab class="add-btn" right bottom @click="showModal = true">
      <q-btn icon="add" color="primary" />
    </q-fab>
  </q-page>
</template>

<script>
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
        email: '',
        managerId: '',
        phoneNumber: ''
      },
      employees: [
        { id: 1, name: 'Alice', surname: 'Johnson', email: 'alice.johnson@example.com', managerId: 1001, phoneNumber: 1234567890 },
        { id: 2, name: 'Bob', surname: 'Smith', email: 'bob.smith@example.com', managerId: 1002, phoneNumber: 2345678901 },
        { id: 3, name: 'Carol', surname: 'Davis', email: 'carol.davis@example.com', managerId: 1003, phoneNumber: 3456789012 }
      ],
      columns: [
        { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
        { name: 'surname', required: true, label: 'Surname', align: 'left', field: 'surname', sortable: true },
        { name: 'email', required: true, label: 'Email', align: 'left', field: 'email', sortable: true },
        { name: 'managerId', required: true, label: 'Manager ID', align: 'left', field: 'managerId', sortable: true },
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
  methods: {
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
          this.employees.splice(index, 1, { ...this.formEmployee })
        }
        this.isEditing = false
      } else {
        const newId = this.employees.length ? this.employees[this.employees.length - 1].id + 1 : 1
        this.employees.push({ ...this.formEmployee, id: newId })
      }
      this.closeModal()
    },
    closeModal() {
      this.showModal = false
      this.formEmployee = { id: null, name: '', surname: '', email: '', managerId: '', phoneNumber: '' }
      this.isEditing = false
    },
    goBack() {
      this.$router.go(-1) // Assuming you're using Vue Router
    }
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

.btn {
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}

.btn:hover {
  filter: brightness(85%);
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-edit {
  background-color: #ffc107;
  color: black;
}

.btn-new {
  background-color: #28a745;
  color: white;
}

.btn-back {
  background-color: #1877d2;
  color: white;
}

.btn-cancel {
  background-color: #dc3545;
  color: white;
  margin-right: 10px; 
}

.btn-save {
  background-color: #007bff;
  color: white;
  margin-right: 10px;
}

/* Modal styles */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.close {
  color: #aaa;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.close:hover {
  color: black;
}

input[type="text"], input[type="email"], input[type="number"] {
  width: calc(100% - 22px); /* Adjust for padding and borders */
  padding: 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
