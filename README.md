# Email Marker API client for Node.js and browser

This is a Email Marker API client for Node.js and browser written in Typescript.

## Installation

```shell
npm i email-marker-client
```

or

```shell
yarn add email-marker-client
```

## Simple Example

As demonstrated by this example, you can verify email by passing it to <a href="https://www.emailmarker.com/" target="_blank">Email Marker</a> verification service.

```typescript
import { EmailMarkerClient } from 'email-marker-client';

...

const emailMarker = new EmailMarkerClient(config.EMAIL_MARKER_API_KEY);

const result = await emailMarker.verify('test@example.com');
console.log(`The email verification result is: ${result}`);
```

## Configuration

You can get an API key in your Email Marker account <a href="https://app.emailmarker.com/api/" target="_blank">here</a>.

Please read <a href="http://docs.emailmarker.com/" target="_blank">Email Marker API documentation</a>.

## Need Help?

Drop me an email to [Mikhail Monchak](mailto:mikhail.monchak.work@gmail.com)
