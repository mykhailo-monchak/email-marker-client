export class EmailMarkerError extends Error {
  public readonly response?: Response;
  public readonly status?: number;

  constructor(message: string, response?: Response) {
    super(message);
    this.name = 'EmailMarkerError';
    this.response = response;
    this.status = response?.status;
  }

  static async fromResponse(response: Response): Promise<EmailMarkerError> {
    const body = await response.text().catch(() => undefined);
    const message = `Email Marker API responded with ${response.status} ${response.statusText}${
      body ? `: ${body}` : ''
    }`;

    return new EmailMarkerError(message, response);
  }
}
