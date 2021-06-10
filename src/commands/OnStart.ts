import {Command} from "@colyseus/command";
import {RoomState} from "../rooms/schema/RoomState";

export class OnStartCommand extends Command<RoomState, {}> {
  execute({} = this.payload) {
    const words = ["io", "sp", "mph", "ete", "iti", "ed", "ot", "ee", "nd", "nce", "ers", "th", "om", "es", "rco", "oti", "nio", "on"];
    this.state.words.concat(words);
    this.state.started = true;
  }


}