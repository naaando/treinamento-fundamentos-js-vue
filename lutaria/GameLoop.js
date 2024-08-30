import readline from "node:readline";

const fullLine =
  "-----------------------------------------------------------------------------------";

export default class GameLoop {
  jogador1;
  jogador2;
  jogadorDaVez;
  readline;
  emoji = "🎮";

  constructor(jogador1, jogador2) {
    this.jogador1 = jogador1;
    this.jogador2 = jogador2;

    this.adicionarComemoracao();

    this.jogadorDaVez = Math.random() > 0.5 ? this.jogador1 : this.jogador2;

    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    [
      "Bem vindo ao jogo de luta ﾚuｲﾑ尺ﾉﾑ.",
      "",
      "Cada um dos adversários começam com 10 pontos de vida e fôlego.",
      "O primeiro a chegar a 0 pontos de vida perde.",
      "O ataque custa 3 pontos de fôlego, a esquiva custa 1 e a defesa custa 3.",
      "",
      "Adversários:",
      "",
      this.jogador1.caracteristicas(),
      this.jogador2.caracteristicas(),
      "",
      `Primeiro a jogar: ${this.jogadorDaVez.emoji} ${this.jogadorDaVez.nome}`,
      "",
      fullLine,
    ].forEach((l) => console.log(l));
  }

  async run() {
    if (this.jogadorDaVez === this.jogador1) {
      await this.acaoHumano();
    } else {
      await this.acaoMaquina();
    }

    if (this.oponente().vida <= 0) {
      this.readline.write(`${fullLine}\n`);

      if (this.jogadorDaVez.comemorar) {
        // this.jogadorDaVez.comemorar()
        const comemorar = () => this.jogadorDaVez.comemorar();
        // const comemorar = this.jogadorDaVez.comemorar.bind(this.jogadorDaVez);
        comemorar();
      } else {
        console.log(`${this.emoji} Vencedor: ${this.jogadorDaVez.nome}`);
      }

      this.readline.close();
      return;
    }

    console.log(this.jogador1.status() + " x " + this.jogador2.status());
    this.readline.write(`${fullLine}\n`);

    this.trocarJogador();
    await this.run();
  }

  acaoHumano() {
    return new Promise((resolve) => {
      this.readline.question(
        `${this.jogadorDaVez.nome}: [A] Atacar ou [R] Recuperar?`,
        (resposta) => {
          readline.moveCursor(process.stdout, 0, -1);
          readline.clearLine(process.stdout, 0);

          if (resposta.toLowerCase() == "a") {
            this.jogadorDaVez.atacar(this.oponente());
          } else {
            this.jogadorDaVez.recuperar();
          }

          resolve();
        }
      );
    });
  }

  acaoMaquina() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const atacar = Math.random() > 0.5;
        if (atacar) {
          this.jogadorDaVez.atacar(this.oponente());
        } else {
          this.jogadorDaVez.recuperar();
        }

        resolve();
      }, Math.random() * 2000);
    });
  }

  oponente() {
    return this.jogadorDaVez === this.jogador1 ? this.jogador2 : this.jogador1;
  }

  trocarJogador() {
    this.jogadorDaVez = this.oponente();
  }

  adicionarComemoracao() {
    this.jogador1.comemorar = function (oponente) {
      // função anonima (this do objeto lutador)
      console.log(
        `${this.emoji}: Não foi dessa vez que a IA super avançada dominou o mundo.`
      );
    };

    this.jogador2.comemorar = (oponente) => {
      // arrow function (this do contexto atual)
      console.log(`${this.emoji}: Ameaça humana aniquilada!!!`);
    };
    // this.jogador1.comemorar();
    // this.jogador2.comemorar();
  }
}
