## API Report File for "@bentley/frontend-application-insights-client"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { AuthorizedClientRequestContext } from '@bentley/itwin-client';
import { ClientTelemetryEvent } from '@bentley/telemetry-client';
import { FrontendTelemetryClient } from '@bentley/telemetry-client';

// @alpha (undocumented)
export class FrontendApplicationInsightsClient extends FrontendTelemetryClient {
    constructor(_applicationInsightsKey: string);
    // (undocumented)
    protected readonly _aiClient: ApplicationInsights;
    // (undocumented)
    protected readonly _applicationInsightsKey: string;
    // (undocumented)
    protected _postTelemetry(_requestContext: AuthorizedClientRequestContext, frontendTelemetryEvent: ClientTelemetryEvent): Promise<void>;
}


// (No @packageDocumentation comment for this package)

```
