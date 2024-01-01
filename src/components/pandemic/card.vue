<script setup lang="ts">
import {computed} from "vue";
import { getImagePath } from "@/plugins/pandemic.ts";

const props = defineProps<{
  card: number,
  type: 'pandemic-fall-of-rome',
}>()

const path = computed(() => {
  return getImagePath(props.type ,props.card)
})
</script>

<template>
  <div class="bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
    <img :src="path" alt="Card" class="w-full h-full">
  </div>
</template>
