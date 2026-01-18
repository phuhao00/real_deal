---
name: auth-skill
description: Authentication and authorization for real_deal platform including third-party login (WeChat, Apple, Google, GitHub, LinkedIn), OAuth/OIDC flows, account merging, session management, and security best practices. Use when implementing login systems, handling OAuth callbacks, managing user sessions, or working with identity providers.
---

# Authentication & Authorization

## Supported Identity Providers

### Domestic (China)
- WeChat / WeChat Work
- DingTalk
- Alipay
- Weibo

### International
- Apple
- Google
- GitHub
- LinkedIn
- Microsoft (Azure AD/Personal)

### Extended
- Passkeys (WebAuthn)
- TOTP 2FA
- SMS one-tap login

## OAuth/OIDC Flow (Code Flow + PKCE)

### Initiation
1. User selects "Login with X"
2. Backend generates `state` and `nonce`
3. Frontend includes PKCE `code_challenge`
4. Redirect to provider

### Callback
1. Verify `state`/`nonce`
2. Use `code_verifier` to exchange tokens
3. Extract user info from ID Token/userinfo endpoint
4. Minimal fields: email, avatar, nickname, unique ID

### Account Binding

**Automatic Binding**:
- Same verified email triggers merge (with user confirmation)

**Manual Binding**:
- Users manage multiple providers in "Account & Security"
- Prevent duplicate accounts

**WeChat/No Email**:
- Use `unionid/openid` as unique key
- Prompt for email/phone when needed

## Data Models

### Core Models
- `User` - User profile
- `UserIdentity` - Provider linkage (provider/subject/verifiedEmail/linkedAt)
- `Session` - Active sessions
- `RefreshToken` - Hashed storage with revocation

### Security Fields
- Hashed tokens stored in Redis/MongoDB
- Token rotation with revocation support
- Device fingerprinting (lightweight)

## Session Management

### Tokens
- **Access Token**: Short-lived (e.g., 15-60 minutes)
- **Refresh Token**: Rolling refresh mechanism
- Storage: Hashed in database, revocable

### Cookies
- `httpOnly` / `Secure` / `SameSite=Lax`
- Session cookie for authenticated state
- CSRF protection

### 2FA
- Require for critical operations
- Optional for regular use

## Security Best Practices

### Request Validation
- CSRF tokens
- PKCE for all OAuth flows
- `state` and `nonce` parameters
- Rate limiting on login endpoints
- Login anomaly detection

### Data Minimization
- Request only email/profile scopes
- Reject contact/friends list access
- Cache tokens/user info as needed
- Regular rotation and cleanup

### Compliance
- GDPR/CCPA/PIPL support
- Consent management
- Audit logging
- Data export/deletion rights

## Common Tasks

### Add New Provider
1. Register application with provider
2. Add client ID/secret to environment variables
3. Implement OAuth flow handler
4. Update user account binding logic
5. Add UI login button

### Account Merge
1. Detect matching verified emails
2. Prompt user for confirmation
3. Merge identities under single user
4. Migrate sessions and preferences

### Session Cleanup
1. Implement token revocation on logout
2. Schedule cleanup of expired refresh tokens
3. Audit active sessions in user dashboard
