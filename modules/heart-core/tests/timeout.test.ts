import { assertSpyCalls, spy } from "testing/mock.ts";
import { timeout } from "../src/time/timeout.ts";
import { FakeTime } from "testing/time.ts";

Deno.test("should run a real timeout", async () => {
  const time = new FakeTime();
  const timeoutSpy = spy(timeout);

  try {
    await timeout(500);
    assertSpyCalls(timeoutSpy, 0);
    time.tick(500);
    assertSpyCalls(timeoutSpy, 1);
  } finally {
    time.restore();
  }
});
