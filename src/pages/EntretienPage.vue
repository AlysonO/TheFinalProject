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

 -->

 <template>
  <q-page class="q-pa-md">
    <q-btn color="primary" label="Add Entretien" @click="showAddEntretienModal = true"></q-btn>

    <q-dialog v-model="showAddEntretienModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add New Entretien</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="addEntretien">
            <q-select
              v-model="newEntretien.employeeId"
              :options="employeeOptions"
              label="Select Employee"
              emit-value
              map-options
              option-value="id"
              option-label="name"
            ></q-select>

            <q-select
              v-model="newEntretien.managerId"
              :options="managerOptions"
              label="Select Manager"
              emit-value
              map-options
              option-value="id"
              option-label="name"
            ></q-select>

            <q-input v-model="newEntretien.date" filled label="Entretien Date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="newEntretien.date" :mask="newEntretien.date" minimal>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-btn label="Add Entretien" type="submit" color="primary"></q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

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
import { defineComponent, ref, computed, reactive } from 'vue'
import { employees, entretiens } from '../data/data' // Adjust the path as necessary

export default defineComponent({
  name: 'EntretienPage',

  setup() {
    const slide = ref('upcoming')
    const showAddEntretienModal = ref(false)
    const newEntretien = reactive({ employeeId: '', managerId: '', date: '' })
    const now = new Date()

    const columns = [
      { name: 'id', required: true, label: 'ID', align: 'left', field: row => row.id, sortable: true },
      { name: 'employee', label: 'Employee', field: row => getEmployeeName(row.employeeId), sortable: true },
      { name: 'manager', label: 'Manager', field: row => getEmployeeName(row.managerId), sortable: true },
      { name: 'date', label: 'Date', field: row => new Date(row.date).toLocaleString(), sortable: true },
    ]

    const getEmployee = (id) => {
      return employees.find(emp => emp.id === id)
    }

    const getEmployeeName = (id) => {
      const employee = getEmployee(id)
      return employee ? `${employee.name.trim()} ${employee.surname.trim()}` : 'Unknown'
    }

    const employeeOptions = computed(() => {
      return employees.map(emp => ({ id: emp.id, name: `${emp.name.trim()} ${emp.surname.trim()}` }))
    })

    const managerOptions = computed(() => {
      return employees.filter(emp => emp.role.trim() === 'Manager').map(emp => ({ id: emp.id, name: `${emp.name.trim()} ${emp.surname.trim()}` }))
    })

    const upcomingEntretiens = computed(() => {
      return entretiens.filter(e => new Date(e.date) > now)
    })

    const pastEntretiens = computed(() => {
      return entretiens.filter(e => new Date(e.date) <= now)
    })

    function addEntretien() {
      entretiens.push({ ...newEntretien, id: entretiens.length + 1, date: new Date(newEntretien.date).toISOString() })
      showAddEntretienModal.value = false
      newEntretien.employeeId = ''
      newEntretien.managerId = ''
      newEntretien.date = ''
    }

    return {
      slide,
      showAddEntretienModal,
      newEntretien,
      upcomingEntretiens,
      pastEntretiens,
      columns,
      employeeOptions,
      managerOptions,
      addEntretien
    }
  }
})
</script>

<style>
/* Add your style customization if needed */
</style>
