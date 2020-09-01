export type EmailMarkerResult = 'valid' | 'invalid' | 'unknown';

export interface EmailMarkerResponse {
  success: boolean;
  result: EmailMarkerResult;
  message: string;
}
