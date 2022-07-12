// import { assertSpyCalls, spy } from "testing/mock.ts";
// import { wait } from "../src/time/wait.ts";
// import { FakeTime } from "testing/time.ts";

// Deno.test("should run a real timeout", async () => {
//   const time = new FakeTime();
//   const spyWait = spy(wait)

//   try {
//     await spyWait(500);
//     time.tick(500);
//     assertSpyCalls(spyWait, 1);
//   } finally {
//     time.restore();
//   }
// });
