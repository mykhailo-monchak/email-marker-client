import fetch from 'cross-fetch';
import { EmailMarkerError, EmailMarkerResponse } from '.';

export class EmailMarkerClient {
  constructor(private readonly apiKey: string) {}

  public async verify(email: string): Promise<EmailMarkerResponse> {
    const params = new URLSearchParams({ apiKey: this.apiKey, email });

    let res: Response;
    try {
      res = await fetch(`https://app.emailmarker.com/api/verify?${params.toString()}`);
    } catch (err) {
      throw new EmailMarkerError(
        `Email Marker API request failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    if (res.ok) {
      return (await res.json()) as EmailMarkerResponse;
    } else {
      throw await EmailMarkerError.fromResponse(res);
    }
  }
}
