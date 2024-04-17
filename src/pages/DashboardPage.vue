<template>
  <q-page class="q-pa-md">
    <div class="text-h2 q-pa-lg">Dashboard</div>
    <div class="q-pa-md row items-start q-gutter-lg">
      <q-card class="col-3">
        <q-card-section>
          <div class="text-h5">Managés</div>
          <ul>
            <li v-for="person in manages" :key="person">{{ person.surname }} {{ person.name }}</li>
          </ul>
        </q-card-section>
      </q-card>

      <q-card class="col-3">
        <q-card-section>
          <div class="text-h5">Mon manager</div>
          <div>{{ manager.surname }} {{ manager.name }}</div>
        </q-card-section>
      </q-card>

      <q-card class="col-3">
        <q-card-section>
          <div class="text-h5">Prochains entretiens</div>
          <div v-for="date in entretien" :key="date">
            <div>Managé: {{ date.employeeId }}</div>
            <div>Date: {{ date.date }}</div>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="col-3">
        <q-card-section>
          <div class="text-h5">Mon prochain entretien personnel</div>
          <div>Manager: {{ entretienPerso.managerId }}</div>
          <div>Date: {{ entretienPerso.date }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { defineComponent } from 'vue'
import { employees, entretiens } from 'src/data/data'

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const getManages = (id) => {
  return employees.filter((employee) => employee.managerId === id)
}

const getManager = (id) => {
  const managee = employees.find((employee) => employee.id === id)
  return employees.find((employee) => employee.id === managee.managerId)
}

const getEntretiens = (id) => {
  return entretiens.filter((entretien) => entretien.managerId === id)
}

const getEntretienPerso = (id) => {
  return entretiens.filter((entretien) => entretien.employeeId === id)[0]
}

const manages = getManages(user.userId)
const manager = getManager(user.userId)
const entretien = getEntretiens(user.userId)
const entretienPerso = getEntretienPerso(user.userId)
console.log(entretienPerso)
</script>
