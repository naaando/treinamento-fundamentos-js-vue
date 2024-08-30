<script lang="ts">
import type { PropType } from 'vue';

export default {
  props: {
    logs: Array as PropType<string[]>
  },
  computed: {
    reversedLogs() {
      return this.logs?.map((message, i) => ({
        id: i + 1,
        message: message
      })).reverse()
    }
  }
}
</script>

<template>
  <div class="text-xl mb-3">
    Log de batalha
  </div>

  <div
    v-for="log in reversedLogs"
    :key="log.id"
    class="text-white py-0.5"
  >
    {{ log.id }} · {{ log.message }}
  </div>
</template>