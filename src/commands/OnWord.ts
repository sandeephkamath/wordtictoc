import {Command} from "@colyseus/command";
import {RoomState} from "../rooms/schema/RoomState";
import {check} from "./WordChecker";


export interface WordProps {
  sessionId: string;
  word: string;
}

export class OnWordCommand extends Command<RoomState, { props: WordProps }> {
  execute({props} = this.payload) {
    const player = this.state.players.get(props.sessionId);
    const word = props.word;
    const subString = this.state.words[player.wordIndex];
    if (check(word, subString)) {
      player.score += 10;
    } else if (player.score > 0) {
      player.score -= 10;
    }
    player.wordIndex++;
    if (player.wordIndex >= this.state.words.length) {
      player.wordIndex = 0;
    }
  }
}