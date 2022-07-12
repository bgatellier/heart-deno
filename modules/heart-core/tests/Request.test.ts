// import { Request } from "../src/http/Request.ts";
// import { assertSpyCall, spy } from "testing/mock.ts";

// const API_URL = "https://jsonplaceholder.typicode.com/todos/1";
// const RESPONSE = {
//   userId: 1,
//   id: 1,
//   title: "delectus aut autem",
//   completed: false,
// };

// Deno.test("should returns a JSON content if the GET method is used", () => {
//   // cannot stub the fetch() method, so this test cannot be done anymore

//   assertSpyCall(RequestGetSpy, 0, {
//     args: [API_URL],
//     returned: RESPONSE as unknown,
//   });
// });

// Deno.test("should returns a JSON content if the POST method is used", () => {
//   // cannot stub the fetch() method, so this test cannot be done anymore

//   assertSpyCall(RequestPostSpy, 0, {
//     args: [API_URL, {}],
//     returned: RESPONSE as unknown,
//   });
// });
