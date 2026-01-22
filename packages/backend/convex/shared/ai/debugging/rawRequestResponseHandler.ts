import { RawRequestResponseHandler } from "@convex-dev/agent";

export const rawRequestResponseHandler: RawRequestResponseHandler = async (ctx, args) => {
  const { request, response, agentName, threadId, userId } = args;

  if (process.env.DEBUG !== "true") return;

  // Logging it here, to look up in the logs.
  // Note: really long requests & responses may end up truncated.
  console.log({
    name: "rawRequestResponseHandler event",
    agentName,
    threadId,
    userId,
    // This is to remove undefined values
    request: JSON.parse(JSON.stringify(request)),
    responseHeaders: response.headers,
  });
}
