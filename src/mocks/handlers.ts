import { http, HttpResponse } from "msw";
import { Tokens } from "./mockData";

export const handlers = [
  http.get("https://api.socket.tech/v2/token-lists/to-token-list", () => {
    return HttpResponse.json({
      success: true,
      result: Tokens,
    });
  }),
];
