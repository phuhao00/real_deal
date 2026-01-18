# MongoDB Collections Reference

## Collections Overview

### users
User accounts and profiles
```json
{
  "id": "string",
  "name": "string",
  "role": "candidate|recruiter|investor",
  "email": "string"
}
```

### projects
Project listings
```json
{
  "id": "string",
  "title": "string",
  "summary": "string",
  "tags": ["string"],
  "media": ["MediaAsset"]
}
```

### products
Product listings
```json
{
  "id": "string",
  "name": "string",
  "summary": "string",
  "tags": ["string"],
  "media": ["MediaAsset"]
}
```

### posts
Blog posts and updates
```json
{
  "id": "string",
  "title": "string",
  "body": "string",
  "tags": ["string"],
  "created": "datetime"
}
```

### jobs
Job listings
```json
{
  "id": "string",
  "title": "string",
  "location": "string",
  "level": "string",
  "salary": "string",
  "skills": ["string"]
}
```

### companies
Company profiles
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "verified": "boolean",
  "tags": ["string"]
}
```

### pitch_pages
Founder pitch pages
```json
{
  "id": "string",
  "title": "string",
  "company": "string"
}
```

### deal_rooms
Private deal rooms
```json
{
  "id": "string",
  "pitchId": "string",
  "access": "string"
}
```

### investors
Investor profiles
```json
{
  "id": "string",
  "name": "string",
  "thesis": "string",
  "stages": ["string"],
  "regions": ["string"]
}
```

## Query Examples

### Find all jobs
```go
cur, err := h.DB.Collection("jobs").Find(ctx, bson.D{})
```

### Find job by ID
```go
err := h.DB.Collection("jobs").FindOne(ctx, bson.M{"id": "job_001"}).Decode(&job)
```

### Find jobs by location
```go
cur, err := h.DB.Collection("jobs").Find(ctx, bson.M{"location": "上海"})
```

### Aggregate jobs by location
```go
pipeline := []bson.M{
  {"$group": bson.M{"_id": "$location", "count": bson.M{"$sum": 1}}},
}
cur, err := h.DB.Collection("jobs").Aggregate(ctx, pipeline)
```
