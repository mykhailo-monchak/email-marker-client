import { EmailMarkerClient } from '../src/email-marker.client';
import * as dotenv from 'dotenv';

async function test() {
  dotenv.config();

  const apiKey = process.env.TEST_API_KEY;
  if (!apiKey) {
    throw new Error('TEST_API_KEY is not set — copy .env.sample to .env and fill it in');
  }

  const client = new EmailMarkerClient(apiKey);

  const result = await client.verify('test@example.com');
  console.log('result:', result);

  if (typeof result.success !== 'boolean' || !['valid', 'invalid', 'unknown'].includes(result.result)) {
    throw new Error(`Unexpected response shape: ${JSON.stringify(result)}`);
  }

  console.log('tested');
}

test();
