import {RoomState} from "../rooms/schema/RoomState";
import {Room} from "./mock/colyseus";
import {Dispatcher} from "@colyseus/command";
import {Player} from "../rooms/player/Player";
import {OnWordCommand} from "../commands/OnWord";
import * as assert from "assert";

describe("OnWordCommand", () => {
  let room: Room<RoomState>;

  beforeEach(() => {
    room = new Room<RoomState>();
    room.setState(new RoomState());
  });

  it("Should increase the player score when correct word", () => {
    const dispatcher = new Dispatcher(room);
    const clientId = "123";
    const player = new Player("P1");
    room.state.words = ["at"];
    room.state.players.set(clientId, player)

    const wordPayload = {sessionId: clientId, word: "cat"}
    dispatcher.dispatch(new OnWordCommand(), {props: wordPayload});
    assert.strictEqual(player.score, 10);
    assert.strictEqual(player.wordIndex, 0);
  });

})