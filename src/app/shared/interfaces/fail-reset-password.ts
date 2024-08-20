export interface FailResetPassword {
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Error;
}

export interface Error {
  statusMsg: string;
  message: string;
}

export interface Headers {
  normalizedNames: NormalizedNames;
  lazyUpdate: null;
  headers: NormalizedNames;
}

export interface NormalizedNames {
}
