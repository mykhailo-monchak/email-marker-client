export interface EmailMarkerResponse {
  success: boolean;
  result: 'valid' | 'invalid' | 'unknown';
  message: string;
}
