<script setup lang="ts">
import useGameStore from '@/stores/pandemic-fall-of-rome';
import { computed, ref } from "vue";
import Card from "@/components/pandemic/card.vue"
import { ROME } from "@/constant.ts"
const gameStore = useGameStore()

const phase = ref('setup')
const currentInit = ref<Array<number>>()
const totalDraw = ref(0)
const currentDraw = ref<null | number>(null)
const totalInvade = ref(0)
const currentInvade = ref<null | number>(null)

const buttonText = computed(() => {
  switch (phase.value) {
    case 'setup':
      return 'Continue'
    case 'draw':
      if (totalDraw.value === 2) {
        return 'Finish Draw'
      }
      return `Draw (${2 - totalDraw.value})`
    case 'invade':
      if (totalInvade.value === gameStore.currentInfectionRate) {
        return 'Finish Invade'
      }
      return `Invade (${gameStore.currentInfectionRate - totalInvade.value})`
    case 'lose':
      return 'Lose!'
  }
})

gameStore.setup()
currentInit.value = gameStore.doInit()

function buttonClick() {
  switch (phase.value) {
    case 'setup':
      if (gameStore.currentInitCube === 1) {
        phase.value = 'draw'
      } else {
        currentInit.value = gameStore.doInit()
      }
      break
    case 'draw':
      if (gameStore.revolts.length === 0) {
        phase.value = 'Lose!'
        return
      }
      if (totalDraw.value === 2) {
        phase.value = 'invade'
        totalDraw.value = 0
        currentDraw.value = null
        return
      }
      currentDraw.value = gameStore.doRevolt()
      totalDraw.value++
      break
    case 'invade':
      if (totalInvade.value === gameStore.currentInfectionRate) {
        phase.value = 'draw'
        totalInvade.value = 0
        currentInvade.value = null
        return
      }
      currentInvade.value = gameStore.doInvade()
      totalInvade.value++
      break
  }
}
</script>

<template>
  <div class="h-screen relative">
    <div class="text-xl text-center bg-red-900/20 py-1 font-bold text-red-900/70">Pandemic Fall of Rome</div>
    <div class="capitalize ml-2 mt-1">Phase: {{ phase }}</div>
    <div v-if="phase === 'setup'">
      <div class="font-bold text-center text-xl">{{ gameStore.currentInitCube }} cube</div>
      <div class="flex space-x-3 px-2 bg-amber-100 py-2">
        <card v-for="card in currentInit" :key="`invade-${card}`" :card="card" :type="ROME" class="w-1/3" />
      </div>
    </div>
    <div v-else>
      <div v-if="phase === 'invade'" class="font-bold text-center text-xl">Rate: {{ gameStore.currentInfectionRate }}</div>
      <div v-if="currentDraw">
        <div class="text-2xl font-bold text-center">Revolt!</div>
        <div class="flex justify-center">
          <card :card="currentDraw" :type="ROME" class="w-1/3" />
        </div>
      </div>
      <div v-if="currentInvade">
        <div class="flex justify-center">
          <card :card="currentInvade" :type="ROME" class="w-1/3" />
        </div>
      </div>
    </div>
    <div class="flex justify-center absolute bottom-6 left-1/2 -translate-x-1/2" @click="buttonClick">
      <button class="px-4 py-2 text-white bg-amber-700 rounded-lg capitalize">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>