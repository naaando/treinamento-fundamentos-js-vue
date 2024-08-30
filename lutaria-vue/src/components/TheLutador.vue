<script lang="ts">
import { type PropType } from 'vue'
import Lutador from '../lutaria/Lutador'

export default {
  props: {
    humano: Boolean,
    lutador: {
      type: Lutador,
      required: true
    },
    jogadorDaVez: {
      type: Lutador as PropType<Lutador | null>,
      required: false
    },
    partidaTerminada: Boolean
  },
  computed: {
    vivo() {
      return this.lutador.vida > 0
    },
    classeTitulo() {
      if (!this.vivo) {
        return 'text-gray'
      }

      if (this.partidaTerminada && this.minhaVez) {
        return 'text-yellow-500'
      }

      if (this.minhaVez) {
        return 'text-yellow-500 animate-pulse'
      }

      return 'text-white'
    },
    exibirAcoes() {
      return this.humano && this.minhaVez && !this.partidaTerminada
    },
    minhaVez() {
      return this.lutador === this.jogadorDaVez
    },
    vidaPercentual() {
      return this.percentual(this.lutador.vida)
    },
    folegoPercentual() {
      return this.percentual(this.lutador.folego)
    }
  },
  methods: {
    percentual(x: number) {
      if (Math.max(0, x) === 0) {
        return 0
      }

      if (Math.min(10, x) === 10) {
        return 100
      }

      return (x / 10) * 100
    }
  }
}
</script>

<template>
  <div>
    <div class="text-4xl mb-2" :class="classeTitulo">{{ lutador.emoji }}</div>
    <h1 class="text-xl mb-3 font-bold" :class="classeTitulo">
      {{ lutador.nome }}

      <template v-if="partidaTerminada">
        <span v-if="vivo">(🎉 vencedor)</span>
        <span v-else>(💀 derrotado)</span>
      </template>

      <span v-else-if="minhaVez">(🔥 minha vez)</span>
    </h1>

    <div class="my-3 flex space-x-3" :class="vivo ? 'text-white' : 'text-gray'">
      <div>🔪 {{ lutador.ataque}}</div>
      <div>🛡️ {{ lutador.defesa}}</div>
      <div>🍃 {{ lutador.velocidade}}</div>
    </div>

    <div>
      Vida
      <span class="text-white">{{ lutador.vida }}</span>
      <span class="text-white"> ({{ vidaPercentual }}%)</span>
    </div>

    <div class="relative">
      <div class="bg-red-500 opacity-15 w-full h-4 mb-3 rounded-full z-0"></div>
      <div
        class="bg-red-500 h-4 mb-3 rounded-full absolute top-0 left-0 z-10"
        :style="`width: ${vidaPercentual}%`"
      ></div>
    </div>

    <div>
      Fôlego
      <span class="text-white">{{ lutador.folego }}</span>
      <span class="text-white"> ({{ folegoPercentual }}%)</span>
    </div>

    <div class="relative">
      <div class="bg-purple-500 opacity-15 w-full h-4 mb-3 rounded-full z-0"></div>
      <div
        class="bg-purple-500 h-4 mb-3 rounded-full absolute top-0 left-0 z-10"
        :style="`width: ${folegoPercentual}%`"
      ></div>
    </div>

    <div v-if="exibirAcoes" class="flex space-x-5 justify-center">
      <div>
        <button
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          @click="$emit('atacar')"
        >
          Atacar
        </button>
      </div>

      <div>
        <button
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          @click="$emit('recuperar')"
        >
          Recuperar
        </button>
      </div>
    </div>
  </div>
</template>
