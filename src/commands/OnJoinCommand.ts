import {Command} from "@colyseus/command";
import {RoomState} from "../rooms/schema/RoomState";
import {Player} from "../rooms/player/Player";

export interface JoinProps {
  sessionId: string;
  name: string;
}

export class OnJoinCommand extends Command<RoomState, { props: JoinProps }> {
  execute({props} = this.payload) {
    const player = new Player(props.name);
    this.state.players.set(props.sessionId, player);
  }
}