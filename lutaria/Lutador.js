const lutadorPrototype = {
  nome: null,
  vida: 10,
  folego: 10,
  ataque: 0,
  defesa: 0,
  velocidade: 0,
  atacar: function (oponente) {
    // se estiver sem folego não realiza ataque
    if (this.folego < 3) {
      console.log(`(🔹) O ataque de ${this.nome} falhou pois não teve folego.`);
    } else {
      this.folego -= 3;
      oponente.receberAtaque(this);
    }
  },
  // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
  // When the object's members are functions there's a simpler syntax. Instead of bio: function () we can write bio(). Like this:
  receberAtaque(oponente) {
    const velocidade = this.velocidade * Math.random();
    const velocidadeOponente = oponente.velocidade * Math.random();

    // chance de esquiva
    if (this.folego > 1 && velocidade > velocidadeOponente) {
      this.folego -= 1;
      console.log(`(🍃) ${this.nome} esquivou do ataque de ${oponente.nome}`);
      return;
    }

    // Defesa aleatória variando de 0% a 100%
    const defesa =
      this.folego > 3 ? Math.trunc(Math.random() * (this.defesa * 0.5)) : 0;
    const ataque = oponente.ataque * 2;
    const ataqueEfetivado = Math.max(0, ataque - defesa);

    console.log(
      `(🔪) ${oponente.nome} atacou ${this.nome} e causou 🔻 ${ataqueEfetivado} de dano (Ataque 🎲 ${ataque} - defesa 🎲 ${defesa}).`
    );

    this.vida -= ataqueEfetivado;
    this.folego = Math.max(0, this.folego - 3);
  },
  recuperar: recuperar,
  status: function status() {
    return `[${this.nome} · 🍎  vida ${this.vida} · 🔹 folego ${this.folego}]`;
  },
  caracteristicas() {
    return `${this.emoji} ${this.nome} \t [atq 🔪 ${this.ataque}] [def 🛡️  ${this.defesa}] [vel 🍃 ${this.velocidade}]`;
  }
};

function recuperar(forcado = false) {
  // console.log(this);

  if (!forcado) {
    console.log(`(🩹) ${this.nome} escolheu se recuperar.`);
  }

  this.vida += 1;
  this.folego += 3;
}

// Define que o protótipo de objeto criado junto com a função vai ser o objeto do lutador
// Por causa do hoisting é possível referenciar a função em cima da declaração dela
Object.assign(Lutador.prototype, lutadorPrototype);

/**
 * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
 * A constructor is just a function called using the new keyword.
 * Sempre que você tá chamando uma função existe um objeto sendo criado a partir dela.
 * Por isso um callback de função anonima não entende o this que você está referenciando
 */
export function Lutador(
  emoji,
  nome,
  ataque,
  defesa,
  velocidade
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
}
