export interface FailResponse {
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Error;
}

interface Error {
  statusMsg: string;
  message: string;
}

interface Headers {
  normalizedNames: NormalizedNames;
  lazyUpdate: null;
}

interface NormalizedNames {
}
