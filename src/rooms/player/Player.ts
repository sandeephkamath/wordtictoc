import {Schema, type} from "@colyseus/schema";

export class Player extends Schema {
  constructor(name: string) {
    super();
    this.name = name;
  }

  @type("string")
  name: string = "UN-NAMED";

  @type("number")
  score = 0;

  wordIndex = 0;

}