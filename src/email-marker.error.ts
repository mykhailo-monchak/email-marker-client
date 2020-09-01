export class EmailMarkerError<T> extends Error {
  constructor(public readonly response: Response) {
    super(`Email Marker API responded: ${response.statusText}`);
  }
}
