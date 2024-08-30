<script lang="ts">
import LogDeBatalha from './components/LogDeBatalha.vue';
import TheLutador from './components/TheLutador.vue';
import Lutador from './lutaria/Lutador';

export default {
  components: { TheLutador, LogDeBatalha },
  data() {
    return {
      jogador1: new Lutador('🙎', 'Jogador', 3, 3, 4, true),
      jogador2: new Lutador('🤖', 'IA Avançada', 3, 3, 4, false),
      jogadorDaVez: null as Lutador | null,
      emoji: '🎮',
      logs: [] as string[],
      partidaTerminada: false
    }
  },
  created() {
    this.jogadorDaVez = Math.random() > 0.5 ? this.jogador1 : this.jogador2

    this.jogador1.comemorar = () => {
      this.log(`${this.emoji}: Não foi dessa vez que a IA super avançada dominou o mundo.`)
    }

    this.jogador2.comemorar = () =>  {
      this.log(`${this.emoji}: Ameaça humana aniquilada!!!`)
    }

    this.jogador1.log = this.log
    this.jogador2.log = this.log

    if (this.jogadorDaVez.humano === false) {
      this.iaSuperAvancada()
    }
  },
  methods: {
    continuar() {
      if (this.partidaTerminada) {
        throw new Error('Jogo finalizado')
      }

      if (this.oponente().vida <= 0) {
        if (this.jogadorDaVez!.comemorar) {
          this.jogadorDaVez!.comemorar(this.oponente())
        } else {
          console.log(`${this.emoji} Vencedor: ${this.jogadorDaVez!.nome}`);
        }

        this.partidaTerminada = true
        return
      }

      this.trocarJogador()

      if (this.jogadorDaVez?.humano === false) {
        this.iaSuperAvancada()
      }
    },
    atacar() {
      this.jogadorDaVez!.atacar(this.oponente())
      this.continuar()
    },
    recuperar() {
      this.jogadorDaVez!.recuperar()
      this.continuar()
    },
    oponente() {
      return this.jogadorDaVez === this.jogador1 ? this.jogador2 : this.jogador1
    },
    trocarJogador() {
      this.jogadorDaVez = this.jogadorDaVez === this.jogador1 ? this.jogador2 : this.jogador1
    },
    iaSuperAvancada() {
      if (this.jogadorDaVez === null) {
        return
      }

      setTimeout(() => {
        const atacar = Math.random() > 0.5
        if (atacar) {
          this.atacar()
        } else {
          this.recuperar()
        }

      }, Math.random() * 2000)
    },
    log(mensagem: string) {
      this.logs.push(mensagem)
    }
  }
}
</script>

<template>
  <main class="flex space-x-5 p-5 pb-0">
    <TheLutador
      :lutador="jogador1"
      :jogadorDaVez="jogadorDaVez"
      :humano="true"
      class="w-1/2"
      @atacar="atacar"
      @recuperar="recuperar"
      :partidaTerminada="partidaTerminada"
    />
    <TheLutador
      :lutador="jogador2"
      :jogadorDaVez="jogadorDaVez"
      class="w-1/2"
      @atacar="atacar"
      @recuperar="recuperar"
      :partidaTerminada="partidaTerminada"
    />
  </main>

  <div class="p-5">
    <LogDeBatalha :logs="logs" />
  </div>
</template>
