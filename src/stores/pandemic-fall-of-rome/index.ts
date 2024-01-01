import { defineStore } from 'pinia'
import {setupActionCard} from "@/plugins/pandemic.ts"
import { random } from "@/plugins/random"
import {createArrayFromXtoY} from "@/plugins";

const INFECTION_RATE = [2, 2, 3, 3, 4, 4, 4, 5]

export default defineStore('PandemicFallOfRomeStore', {
  state: () => ({
    revolts: [] as Array<number | string>,
    invades: [] as number[],
    discard: [] as number[],
    init: [] as number[],
    currentInfection: 0,
  }),
  getters: {
    currentInitCube(state) {
      return state.init.length / 3 + 1
    },
    currentInfectionRate(state) {
      return INFECTION_RATE[state.currentInfection]
    },
  },
  actions: {
    reset() {
      this.revolts = []
      this.invades = []
      this.discard = []
      this.init = []
      this.currentInfection = 0
    },
    setup() {
      this.reset()
      this.revolts = setupActionCard(47, 7)
      const invades = createArrayFromXtoY(15, 49)
      this.invades = random.shuffle(invades)
      this.discard = createArrayFromXtoY(1, 14)
      const init = createArrayFromXtoY(6, 14)
      this.init = random.shuffle(init)
    },
    doRevolt() {
      const revolt = this.revolts.pop()
      if (revolt === 'p') {
        this.currentInfection++
        const invade = this.invades.shift() as number
        this.discard.push(invade)
        this.invades = [...this.invades, ...random.shuffle(this.discard)]
        this.discard = []
        return invade
      }
      return null
    },
    doInvade() {
      const invade = this.invades.pop() as number
      this.discard.push(invade)
      return invade
    },
    doInit() {
      return this.init.splice(0,3) as number[]
    }
  },
  persist: true,
})
