import GameLoop from "./GameLoop.js";
import { Lutador } from "./Lutador.js";

const jogador1 = new Lutador("🙎", "Jogador", 3, 3, 4);
const jogador2 = new Lutador("🤖", "IA Avançada", 3, 3, 4);

const gameLoop = new GameLoop(jogador1, jogador2);
gameLoop.run();
