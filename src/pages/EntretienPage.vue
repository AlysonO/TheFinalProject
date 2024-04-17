<!-- <template>
  <q-page class="q-pa-md">
    <q-carousel
      v-model="slide"
      infinite
      swipeable
      control-color="black"
      navigation
      padding
      arrows
      class="outline shadow-1 rounded-borders"
    >
      <q-carousel-slide name="upcoming" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="text-h3 q-pa-lg">Entretiens à venir</div>
          <div>
            <q-table :rows="upcomingEntretiens" :columns="columns" row-key="id"></q-table>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="past" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="text-h3">Entretiens passés</div>
          <div>
            <q-table :rows="pastEntretiens" :columns="columns" row-key="id"></q-table>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { employees, entretiens } from '../data/data' // Assuming data.js contains your exported arrays

const columns = [
  { name: 'id', required: true, label: 'ID', align: 'left', field: row => row.id, sortable: true },
  { name: 'employee', label: 'Employee', field: row => getEmployee(row.employeeId).name + ' ' + getEmployee(row.employeeId).surname, sortable: true },
  { name: 'date', label: 'Date', field: row => new Date(row.timestamp).toLocaleString(), sortable: true },
]

const now = new Date()

export default defineComponent({
  name: 'EntretienPage',


  setup() {
    const upcomingEntretiens = computed(() => {
      return entretiens.filter(e => new Date(e.date) > now)
    })

    const pastEntretiens = computed(() => {
      return entretiens.filter(e => new Date(e.date) <= now)
    })

    const getEmployee = (id) => {
      return employees.find(emp => emp.id === id)
    }

    return {
      slide: ref('upcoming'),
      upcomingEntretiens,
      pastEntretiens,
      getEmployee
    }
  }
})
</script> -->

<template>
  <q-page class="q-pa-md">
    <q-carousel
      v-model="slide"
      infinite
      swipeable
      control-color="black"
      navigation
      padding
      arrows
      class="outline shadow-1 rounded-borders"
    >
      <q-carousel-slide name="upcoming" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="text-h3 q-pa-lg">Upcoming Interviews</div>
          <div>
            <q-table :rows="upcomingEntretiens" :columns="columns" row-key="id"></q-table>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="past" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="text-h3">Past Interviews</div>
          <div>
            <q-table :rows="pastEntretiens" :columns="columns" row-key="id"></q-table>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { employees, entretiens } from '../data/data' // Adjust the path as necessary

export default defineComponent({
  name: 'EntretienPage',

  setup() {
    const slide = ref('upcoming')
    const now = new Date()

    const getEmployee = (id) => {
      return employees.find(emp => emp.id === id)
    }

    const getEmployeeName = (id) => {
      const employee = getEmployee(id)
      return employee ? `${employee.name.trim()} ${employee.surname.trim()}` : 'Unknown'
    }

    const columns = [
      { name: 'id', required: true, label: 'ID', align: 'left', field: row => row.id, sortable: true },
      { name: 'employee', label: 'Employee', field: row => getEmployeeName(row.employeeId), sortable: true },
      { name: 'manager', label: 'Manager', field: row => getEmployeeName(getEmployee(row.employeeId).managerId), sortable: true },
      { name: 'date', label: 'Date', field: row => new Date(row.date).toLocaleString(), sortable: true },
    ]

    const upcomingEntretiens = computed(() => {
      return entretiens.filter(e => new Date(e.date) > now)
    })

    const pastEntretiens = computed(() => {
      return entretiens.filter(e => new Date(e.date) <= now)
    })

    return {
      slide,
      upcomingEntretiens,
      pastEntretiens,
      columns
    }
  }
})
</script>

<style>
/* Add your style customization if needed */
</style>


