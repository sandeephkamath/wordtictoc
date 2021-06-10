import {Client, Room as ColyseusRoom} from "colyseus";
import {RoomState} from "./schema/RoomState";
import {Dispatcher} from "@colyseus/command";
import {JoinProps, OnJoinCommand} from "../commands/OnJoinCommand";
import {LeaveProps, OnLeaveCommand} from "../commands/OnLeaveCommand";
import {OnWordCommand} from "../commands/OnWord";
import {OnStartCommand} from "../commands/OnStart";

export class Room extends ColyseusRoom<RoomState> {

  dispatcher: Dispatcher = new Dispatcher(this);

  onCreate(options: any) {
    this.setState(new RoomState());

    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });

    this.onMessage("word", ((client, message) => {
      const payload = {sessionId: client.sessionId, word: message.message};
      this.dispatcher.dispatch(new OnWordCommand(), {props: payload})
    }))

    this.onMessage("start", ((client, message) => {
      const payload = {sessionId: client.sessionId, word: message.message};
      this.dispatcher.dispatch(new OnStartCommand(), {props: payload})
    }))

  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    const joinProps: JoinProps = {
      sessionId: client.sessionId,
      name: options.name
    };
    this.dispatcher.dispatch(new OnJoinCommand(), {props: joinProps});
  }

  onLeave(client: Client, consented: boolean) {
    const leaveProps: LeaveProps = {
      sessionId: client.sessionId,
      broadcast: this.broadcast
    };
    this.dispatcher.dispatch(new OnLeaveCommand(), {props: leaveProps});
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
    this.dispatcher.stop();
  }

}
