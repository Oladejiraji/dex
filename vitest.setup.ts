import { server } from "@/mocks/setup";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

// beforeEach(() => {
//   vi.useFakeTimers();
// });

// afterEach(() => {
//   vi.useRealTimers();
// });

server.events.on("request:start", ({ request }) => {
  console.log("Outgoing:", request.method, request.url);
});
