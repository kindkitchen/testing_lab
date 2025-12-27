import { make_fixture } from "./make_fixture_v2.ts";

Deno.test("make_fixture (v2) should work", async (t) => {
  await t.step("Should be created without errors", async (tt) => {
    const fixture = make_fixture(
      "The dictionary, which represent api to get unique fixture by some predicate:",
      {
        by_id: (data, id: string) => data.id === id,
      },
      "The dictionary, which represent api, to compute specific representation of the data:",
      {
        compact: (d) => ({ id: d.id, name: d.name }),
      },
      "Any amount of variants - ...[initial data, ...all labels with which it should be associated][]:",
      [{}, "all", "boys"],
      [{ id: "TODO" }, "all", "girls"],
    );

    console.log(fixture);
    await tt.step("Should be invoked without errors", () => {
      console.log(fixture.one_unique.by_id("TODO")?.as_state.compact());
    });
  });
});
