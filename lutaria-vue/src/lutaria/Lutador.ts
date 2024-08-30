
export default class Lutador {
  emoji: string;
  nome: string;
  vida: number = 10;
  folego: number = 10;
  ataque: number;
  defesa: number;
  velocidade: number;
  humano: boolean;
  comemorar: ((oponente: Lutador) => void) |  null = null;
  log;

  constructor(
    emoji: string,
    nome: string,
    ataque: number,
    defesa: number,
    velocidade: number,
    humano: boolean = true
  ) {
    if (ataque + defesa + velocidade !== 10) {
      throw new Error(
        "Os valores de ataque, defesa e velocidade precisam somar 10"
      );
    }

    this.emoji = emoji;
    this.nome = nome;
    this.ataque = ataque;
    this.defesa = defesa;
    this.velocidade = velocidade;
    this.humano = humano;
    this.log = (message: string) => console.log(message);
  }

  atacar(oponente: Lutador): void {
    // se estiver sem folego não realiza ataque
    if (this.folego < 3) {
      this.log(`(🔹) O ataque de ${this.nome} falhou pois não teve folego.`);
    } else {
      this.folego -= 3;
      oponente.receberAtaque(this);
    }
  }

  receberAtaque(oponente: Lutador): void {
    const velocidade = this.velocidade * Math.random();
    const velocidadeOponente = oponente.velocidade * Math.random();

    // chance de esquiva
    if (this.folego > 1 && velocidade > velocidadeOponente) {
      this.folego -= 1;
      this.log(`(🍃) ${this.nome} esquivou do ataque de ${oponente.nome}`);
      return;
    }

    // Defesa aleatória variando de 0% a 100%
    const defesa =
      this.folego > 3 ? Math.trunc(Math.random() * (this.defesa * 0.5)) : 0;
    const ataque = oponente.ataque * 2;
    const ataqueEfetivado = Math.max(0, ataque - defesa);

    this.log(
      `(🔪) ${oponente.nome} atacou ${this.nome} e causou 🔻 ${ataqueEfetivado} de dano (Ataque 🎲 ${ataque} - defesa 🎲 ${defesa}).`
    );

    this.vida = Math.max(0, this.vida - ataqueEfetivado);
    this.folego = Math.max(0, this.folego - 3);
  }

  recuperar(forcado = false) {
    if (!forcado) {
      this.log(`(🩹) ${this.nome} escolheu se recuperar.`);
    }

    this.vida += 1;
    this.folego += 3;
  }

  status() {
    return `[${this.nome} · 🍎  vida ${this.vida} · 🔹 folego ${this.folego}]`;
  }
}