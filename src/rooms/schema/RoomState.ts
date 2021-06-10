import {MapSchema, Schema, type} from "@colyseus/schema";
import {Player} from "../player/Player";

export class RoomState extends Schema {

  @type({map: Player})
  players = new MapSchema<Player>();

  @type("boolean")
  started = false;

  words = new Array<string>();

}
