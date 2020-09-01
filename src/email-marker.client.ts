import fetch from 'cross-fetch';
import { EmailMarkerError, EmailMarkerResponse } from '.';

export class EmailMarkerClient {
  constructor(private readonly apiKey: string) {}

  public async verify(email: string): Promise<EmailMarkerResponse> {
    const res: Response = await fetch(
      `https://app.emailmarker.com/api/verify?apiKey=${this.apiKey}&email=${encodeURI(email)}`,
    );

    if (res.ok) {
      return (await res.json()) as EmailMarkerResponse;
    } else {
      throw new EmailMarkerError(res);
    }
  }
}
