# E2E Tests

## Setup

```bash
npm ci
npx playwright install chromium
cp .env.sample .env
# Edit .env with your credentials
```

## Run Tests

```bash
npm test              # All tests
npm run test:debug    # Debug mode
npm run test:ui       # Interactive UI
```

## Environment Variables

```env
# Falcon Authentication
FALCON_USERNAME=your.email@company.com
FALCON_PASSWORD=your-password
FALCON_AUTH_SECRET=your-totp-secret
FALCON_BASE_URL=https://falcon.us-2.crowdstrike.com

# App Configuration
APP_NAME=foundry-sample-insider-risk-sailpoint

# SailPoint API Credentials (required for installation)
# Note: Use the base URL only, without /oauth/token
SAILPOINT_HOST=https://your-tenant.api.identitynow.com
SAILPOINT_CLIENT_ID=your-sailpoint-client-id
SAILPOINT_CLIENT_SECRET=your-sailpoint-client-secret
```
