/* eslint @typescript-eslint/no-unused-vars: 0 */

import { EmailMarkerClient } from '../src/email-marker.client';
import * as dotenv from 'dotenv';

async function test() {
  dotenv.config();

  const client = new EmailMarkerClient(process.env.TEST_API_KEY);

  const result = await client.verify('test@example.com');

  console.log('tested');
}

test();
