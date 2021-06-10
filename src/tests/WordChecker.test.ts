import * as assert from "assert";
import {check} from "../commands/WordChecker";

describe("Word Checker", () => {
  it("Should return true when valid word and substring", () => {
    assert.strictEqual(check("attribute", "att"), true);
  })

  it("Should return false when invalid word", () => {
    assert.strictEqual(check("atttttttt", "att"), false);
  })

  it("Should return false when valid word and invalid substring", () => {
    assert.strictEqual(check("cat", "ap"), false);
  })
})