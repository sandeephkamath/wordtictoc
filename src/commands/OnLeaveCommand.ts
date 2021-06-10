import {Command} from "@colyseus/command";
import {RoomState} from "../rooms/schema/RoomState";

export interface LeaveProps {
  sessionId: string;
  broadcast: any;
}

export class OnLeaveCommand extends Command<RoomState, { props: LeaveProps }> {
  execute({props} = this.payload) {
    const player = this.state.players.get(props.sessionId);
    props.broadcast("playerLeft", `${player.name} left`);
  }
}