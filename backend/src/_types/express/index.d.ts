declare namespace Express {
  interface Request {
    requestId: string;//. in case distributed tracing enabled use or replace this key
  }

  interface Response {
    "request-Id": string;
  }
}
