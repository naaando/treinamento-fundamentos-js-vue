function fabricaDeLutadores(nome, ataque, defesa, velocidade) {
    if (ataque + defesa + velocidade !== 10) {
        throw new Error("Os valores de ataque, defesa e velocidade precisam somar 10");
    }

    return {
        nome: nome,
        vida: 10,
        folego: 10,
        ataque: ataque,
        defesa: defesa,
        velocidade: velocidade,
        atacar: function (oponente) {
            // se estiver sem folego não realiza ataque
            if (this.folego <= 0) {
                return;
            }

            this.folego -= 3;
            oponente.receberAtaque(this);
        },
        receberAtaque: function (oponente) {
            const difVelocidade = 1 - (oponente.velocidade / this.velocidade);

            // chance de esquiva
            if (Math.random() > 0.5) {
                return;
            }

            // Defesa aleatória variando de 0% a 100%
            const defesa = Math.random() * this.defesa;

            // Calcula o ataque menos a defesa
            const ataqueReal = Math.max(0, ataque - defesa);

            this.vida -= ataqueReal;

            this.folego -= 3;
        }
    }
}

const jogador1 = fabricaDeLutadores("player", 3, 3, 4);
const jogador2 = fabricaDeLutadores("oponente", 3, 3, 4);

let jogadorDaVez = jogador1;
let vencedor = null;

while(vencedor === null) {
    const atacante = jogadorDaVez;
    const defensor = jogadorDaVez === jogador1 ? jogador2 : jogador1;

    atacante.atacar(defensor);

    if(defensor.vida <= 0) {
        vencedor = atacante;
    }

    jogadorDaVez = defensor;
}