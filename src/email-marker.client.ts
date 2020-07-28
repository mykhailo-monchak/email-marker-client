import axios from 'axios';
import { EmailMarkerResult } from './email-marker.types';

const ALL_RESULTS: EmailMarkerResult[] = ['valid', 'invalid', 'unknown', 'processing_error'];

export class EmailMarkerClient {
  constructor(private readonly apiKey: string) {}

  public async verify(email: string): Promise<EmailMarkerResult> {
    const url = `https://app.emailmarker.com/api/verify?apiKey=${this.apiKey}&email=${encodeURI(email)}`;
    let status: EmailMarkerResult;

    const res = await axios.get<EmailMarkerResponse>(url);

    if (typeof res.data === 'string' || res.status !== 200 || res.statusText !== 'OK') {
      status = 'processing_error';
    } else {
      status = ALL_RESULTS.indexOf(res.data.result) > -1 ? res.data.result : 'processing_error';
    }

    return status;
  }
}

interface EmailMarkerResponse {
  success: boolean;
  result: EmailMarkerResult;
  message: string;
}
