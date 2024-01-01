<script setup>
import { random } from "@/plugins/random.js";
import { computed, ref } from "vue";
import router from '@/router'

const TOTAL_ACTIONS = 20;
const TOTAL_PROJECTS = 13;
const TOTAL_MAPS = 8;
const TOTAL_PLAYERS = 2;
const ACTION_PER_PLAYER = 3;

const actions = ref([])
const projects = ref([])
const maps = ref([])
const isDisabled = ref(false)
const currentCardZoom = ref('')

const totalPlayers = computed(() => {
  return TOTAL_PLAYERS
})

const isShowActionsCard = computed(() => {
  if (actions.value.length < TOTAL_PLAYERS) {
    return false
  }

  for (let i = 0; i < TOTAL_PLAYERS; i++) {
    if (actions.value[i].length < ACTION_PER_PLAYER) {
      return false
    }
  }

  return projects.value.length === 0
})

const isSelected = ref(false)

function doRandomAction() {
  const raw = Array.from({length: TOTAL_ACTIONS}, (_, i) => i + 1)
  random.shuffle(raw)
  const start = random.integer(1, TOTAL_ACTIONS - TOTAL_PLAYERS * ACTION_PER_PLAYER)
  for (let i = 0; i < TOTAL_PLAYERS; i++) {
      const actionDeal = raw.slice(start + i * ACTION_PER_PLAYER, start + (i + 1) * ACTION_PER_PLAYER)
      actions.value.push(actionDeal)
  }
}

function doRandomProject() {
  const raw = Array.from({length: TOTAL_PROJECTS}, (_, i) => i + 1)
  random.shuffle(raw)
  projects.value = raw.slice(0, 3)
}

function doRandomMap() {
  const raw = Array.from({length: TOTAL_MAPS}, (_, i) => i + 1)
  random.shuffle(raw)
  maps.value = raw.slice(0, TOTAL_PLAYERS)
}

function reRandom() {
  actions.value = []
  projects.value = []
  maps.value = []
  doRandomAction()
  doRandomMap()
  isDisabled.value = true
  setTimeout(() => {
      isDisabled.value = false
  }, 1500)
}

function continueSetup() {
  doRandomProject()
}

function doNewGame() {
  doRandomAction()
  doRandomMap()
  isSelected.value = true
}
</script>

<template>
  <div class="h-screen bg-gray-200 relative overflow-hidden">
    <button
      v-if="actions.length === 0"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-800/90 transition"
      @click="doNewGame"
    >
      Ark Nova
    </button>
    <button class="bg-red-800 text-white py-2 px-4" v-if="!isSelected" @click="router.push({ name: 'PandemicFallOfRome' })">
      Pandemic: Fall of Rome
    </button>
    <button
      v-else
      class="absolute top-4 left-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-800/90 disabled:bg-gray-800/80 transition"
      :disabled="isDisabled"
      @click="reRandom"
    >
      Re Random
    </button>
    <button
      v-if="actions.length > 0 && projects.length === 0"
      class="absolute top-4 right-4 bg-orange-800 text-white py-2 px-4 rounded hover:bg-orange-800/90 disabled:bg-orange-800/80 transition"
      :disabled="isDisabled"
      @click="continueSetup"
    >
      Continue
    </button>
    <div class="absolute bottom-2">
      <div v-if="isShowActionsCard" class="flex divide-x-2 divide-amber-600">
        <div
          v-for="i in totalPlayers"
          :key="`player-${i}`"
          class="px-3 w-1/2"
        >
          <div>
            {{ `Map ${maps[i - 1]}` }}
          </div>
          <div class="flex gap-2">
            <div
                v-for="action in actions[i - 1]"
                :key="`action-${action}`"
                class="w-1/3"
            >
              <img
                class="rounded"
                :src="`/img/action/${action}.webp`"
                alt="Ark nova action card"
                @click="currentCardZoom = `/img/action/${action}.webp`"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="projects.length > 0" class="flex justify-center">
        <div class="w-1/2 flex gap-2">
          <div v-for="project in projects" :key="`project-${project}`">
            <img
                class="rounded"
                :src="`/img/project/${project}.webp`"
                alt="Ark nova action card"
                @click="currentCardZoom = `/img/project/${project}.webp`"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="currentCardZoom !== ''"
      class="absolute h-full w-full bg-gray-900/20 top-0 z-50 flex items-center justify-center"
      @click.self="currentCardZoom = ''"
    >
      <div class="h-[90%]">
        <img class="h-full rounded-lg" :src="currentCardZoom" alt="Ark Nova Card" />
      </div>
    </div>
  </div>
</template>