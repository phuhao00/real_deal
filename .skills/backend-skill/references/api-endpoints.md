# API Endpoints Reference

## Authentication

### POST /api/login
Login with email
- Request: `{ "email": "user@example.com" }`
- Response: User object with session cookie
- Cookie: `uid` (httpOnly, 7 days)

### GET /api/me
Get current user
- Requires authentication
- Response: User object

## Content & Explore

### GET /api/explore
Get all explore content
- Response:
  ```json
  {
    "projects": [...],
    "products": [...],
    "posts": [...],
    "jobs": [...],
    "companies": [...]
  }
  ```

### GET /api/projects
List all projects
- Response: `Project[]`

### GET /api/products
List all products
- Response: `Product[]`

### GET /api/posts
List all posts
- Response: `Post[]`

### GET /api/jobs
List all jobs
- Response: `Job[]`

### GET /api/companies/:id
Get company by ID
- Params: `id` - Company ID
- Response: `Company` object

## VC/YC Features

### GET /api/investors
List investors
- Response: `InvestorProfile[]`

### GET /api/pitch/:id
Get pitch page
- Params: `id` - Pitch ID
- Response: `PitchPage` object

### GET /api/deal-room/:id
Get deal room
- Params: `id` - Deal Room ID
- Response: `DealRoom` object

## Media

### GET /api/media/:id
Get media by ID
- Params: `id` - Media ID
- Response: `MediaAsset` object

### GET /api/media-assets
List media assets
- Response: `MediaAsset[]`

## Compliance & Verification

### GET /api/company-verifications/:companyId
Get company verification status
- Params: `companyId` - Company ID
- Response: `CompanyVerification` object

### GET /api/job-compliance/:jobId
Get job compliance status
- Params: `jobId` - Job ID
- Response: `JobCompliance` object

### GET /api/content-moderation/:id
Get content moderation status
- Params: `id` - Content ID
- Response: `ContentModeration` object

## Billing & Quota

### GET /api/usage
Get usage statistics
- Requires authentication
- Response: `Usage` object
  ```json
  {
    "userId": "string",
    "storageGb": 10.5,
    "bandwidthGb": 25.3,
    "transcodeMin": 45
  }
  ```

### GET /api/quota
Get quota limits
- Requires authentication
- Response: `Quota` object

### GET /api/capacity-packs
List capacity packs
- Requires authentication
- Response: `CapacityPack[]`

### GET /api/job-slots
Get job slots
- Requires authentication
- Response: `JobSlot` object

### GET /api/charges
List charges
- Requires authentication
- Response: `Charge[]`

## Notifications

### GET /api/inbox
Get inbox messages
- Requires authentication
- Response: `InboxItem[]`

### GET /api/notification-preferences
Get notification preferences
- Requires authentication
- Response: `NotificationPreference` object

## Users

### GET /api/users/:id
Get user by ID
- Params: `id` - User ID
- Response: User object
