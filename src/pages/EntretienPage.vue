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
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="text-h3 q-pa-lg">Tous les entretiens</div>
          <div>
            <q-table> </q-table>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="text-h3">Mes entretiens</div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="layers" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="text-h3">Mes entretiens</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'EntretienPage',

  setup() {
    return {
      slide: ref('style')
    }
  }
})
</script>
