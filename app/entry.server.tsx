import { PassThrough } from "stream";
// @ts-ignore
import { renderToPipeableStream } from "react-dom/server";
import type { EntryContext } from "remix";
import { RemixServer } from "remix";

function renderToWritable(element: any, timeout = 10000) {
  const writable = new PassThrough();

  const { pipe, abort } = renderToPipeableStream(element, {
    onCompleteAll() {
      pipe(writable);
    },
    onError(err: Error) {
      abort();
    },
  });

  setTimeout(abort, timeout);
  return writable;
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let stream = renderToWritable(
    <RemixServer context={remixContext} url={request.url} />
  );

  return new Response(stream as any, {
    status: responseStatusCode,
    headers: {
      ...Object.fromEntries(responseHeaders),
      "Content-Type": "text/html",
    },
  });
}
