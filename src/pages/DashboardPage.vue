<template>
  <q-page class="q-pa-md">
    <div class="text-h2 q-pa-lg">Dashboard</div>
    <div class="q-pa-md row items-start q-gutter-lg">
      <q-card class="col-3">
        <q-card-section>
          <div class="text-h5">Managés</div>
          <ul>
            <li v-for="person in manages" :key="person">{{ person }}</li>
          </ul>
        </q-card-section>
      </q-card>

      <q-card class="col-3">
        <q-card-section>
          <div class="text-h5">Mon manager</div>
        </q-card-section>
      </q-card>

      <q-card class="col-3">
        <q-card-section>
          <div class="text-h5">Prochains entretiens</div>
          <div v-for="date in entretien" :key="date">
            <div>Managé: {{ date.managee }}</div>
            <div>Date: {{ date.date }}</div>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="col-3">
        <q-card-section>
          <div class="text-h5">Mon prochain entretien personnel</div>
          <div>Manager:</div>
          <div>Date:</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardPage'
})
</script>
